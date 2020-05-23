# react-decision-tree-flow

This is a library to create declarative wizards in react.js and react-native.

A basic example of a full Wizard looks like this:

```jsx
export const BasicTree = () => {
  const tree = {
    step1: ['step2'],
    step2: ['step3', 'error'],
    step3: ['step1'],
    error: ['step2'],
  };

  return (
    <Wizard tree={tree} first="step1">
      <Step name="step1">
        <div>
          I am step 1
          <br />
          <Controls>
            {({ destinations: { step2 } }) => (
              <button onClick={step2}>Go to Step 2</button>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step2">
        <div>
          I am step 2
          <br />
          <Controls>
            {({ destinations: { step3, error } }) => (
              <div>
                <button onClick={error}>Go to error</button>
                <button onClick={step3}>Go to Step 3</button>
              </div>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="step3">
        <div>
          I am step 3
          <br />
          <Controls>
            {({ destinations: { step1 } }) => (
              <button onClick={step1}>Go to Step 1</button>
            )}
          </Controls>
        </div>
      </Step>
      <Step name="error">
        <div>
          I am step 4
          <br />
          <Controls>
            {({ destinations: { step2 } }) => (
              <button onClick={step2}>Go to Step 2</button>
            )}
          </Controls>
        </div>
      </Step>
    </Wizard>
  );
};
```

## Wizard

The wizard component takes in two props as inputs, a tree and the first step of the wizard. The first step is the initial state of the wizard.

```jsx
const tree = {
  step1: ['step2'],
  step2: ['step2', 'error'],
  step3: [],
  error: [],
};

const MyWizard = ({ children }) => {
  return (
    <Wizard tree={tree} first="step1">
      {children}
    </Wizard>
  );
};
```

### Defining a tree

Trees are defined using JavaScript objects such as the following

```js
const tree = {
  step1: ['step2'],
  step2: ['step3', 'error'],
  step3: [],
  error: [],
};
```

Each step is a key. The value for each of those keys are the possible destinations for the objects in the tree. In the above example, `step1` for example can go only to `step2`, and `step2` may to to `step3` or the `error` step. An empty array such as that in `step3` and `error` signifies that the Wizard has no possible destinations.

If using TypeScript, I highly suggest using [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) to allow for hinting of destinations. This may be done by adding `as const` to your tree object as such.

```ts
const tree = {
  step1: ['step2'],
  step2: [],
} as const;
```

## Steps

Inside of a Wizard, one should create `Steps`. Steps do not have to be displayed linearly. Only one step may be shown at one. If multiple steps in a Wizard have the same name, they may both be shown.

Typically, steps are used like below:

```jsx
const tree = {
  step1: ['step2'],
  step2: [],
};

const MyWizard = () => {
  return (
    <Wizard tree={tree} first="step1">
      <Step name="step1">
        <span> Hello From Step 1</span>
      </Step>
      <Step name="step2">
        <span> Hello From Step 2</span>
      </Step>
    </Wizard>
  );
};
```

## Controls

Controls are what actually drive the Wizard. They may be surfaced via a render prop or hook.

```jsx
// Render Prop
<Wizard>
  ...
  <Controls>
    {({ step, tree, destinations: { step2 }, data }) => (
      <>
        {data && <p>{data}</p>}
        <button onClick={step2}>Go to Step 2</button>
      </>
    )}
  </Controls>
  ...
</Wizard>;

// Hook
const { step, tree, destinations, data } = useControls();
```

When using the hook in typescript, you may pass a `typeof tree` in as a generic for `useControl()` to allow for hinting under destinations as such.

```tsx
const myTree = {
  step1: ['step2'],
  step2: [],
} as const;

...
const { step, tree, destinations } = useControls<typeof myTree>();
// destinations.step1 and destinations.step2 will be hinted!
```

The hook and render props deliver 3 things in the return, the current `step` that the wizard is at, the `tree` that the wizard is using, and finally the `destinations` for the wizard.

The only rule surrounding the `Controls` component and it's hook is that it has the `Wizard` as a descendant. It may go under a `Step` or just the `Wizard` in general.

Data may also be passed from step to step using the functions in `destination` that data is surfaced here using the `data` prop. If data is falsey, it will be undefined.

### `destinations` aka Moving the Wizard.

Inside of the destinations object, you will find keys that correspond to where the wizard can go. The values of those keys are functions that change the state of the wizard. Consider the following example:

```jsx
const tree = {
  step1: ['step2', 'step3'],
  step2: ['step3'],
  step3: [],
};

const MyWizard = () => {
  return (
    <Wizard tree={tree} first="step1">
      <Step name="step1">
        <span> Hello From Step 1</span>
      </Step>
      <Step name="step2">
        <span> Hello From Step 2</span>
      </Step>
      <Step name="step3">
        <span> Hello From Step 3. The end!</span>
      </Step>
      <Controls>
        {({ step, destinations }) => {
          // At step === step1, destinations will contain { step2: () => void, step3: () => void }
          // At step === step2, destination will only contain { step3: () => void }
          // at step === step3, destination will be an empty object.
          Object.entries(destinations).map(([stepName, goToStep]) => {
            return (
              <button key="stepName" onClick={goToStep}>
                Go to {stepName}
              </button>
            );
          });
        }}
      </Controls>
    </Wizard>
  );
};
```

#### Passing data from step to step.

Data may also be passed from step to step using the destination functions. For example:

```jsx
const tree = {
  step1: ['step2'],
  step2: ['step1'],
};

const MyWizard = () => {
  return (
    <Wizard tree={tree} first="step1" initialData="Hello There">
      <Step name="step1">
        <span> Hello From Step 1</span>
        <Controls>
          {({ destinations: { step2 }, data }) => {
            // On first render, data will be "Hello There"
            // All subsequent will be "Kenobi"
            return (
              <>
                <div>{data}</div>
                <button onClick={step2('General')}> Go to step 2</button>
              </>
            );
          }}
        </Controls>
      </Step>
      <Step name="step2">
        <span> Hello From Step 2</span>
        <Controls>
          {({ destinations: { step1 }, data }) => {
            // Data will always be "General"
            return (
              <>
                <div>{data}</div>
                <button onClick={step1('Kenobi')}> Go to step 1</button>
              </>
            );
          }}
        </Controls>
      </Step>
    </Wizard>
  );
};
```

## Recipes

### Effects/Middleware

One may want to put an effect onto the state of a wizard changing. Previously, this library had a middleware function. That has been removed in favor of using `useEffect`. Consider the following example:

```tsx
const tree = {
  step1: ['step2', 'step3'],
  step2: ['step3'],
  step3: [],
} as const;

const WizardInternals = () => {
  const { step, destinations } = useControls<typeof tree>();
  React.useEffect( () => {
    console.log(`I can do things with ${step}`)
  }, [step])
  return (
    <>
      <Step name="step1">
        <span> Hello From Step 1</span>
      </Step>
      <Step name="step2">
        <span> Hello From Step 2</span>
      </Step>
      <Step name="step3">
        <span> Hello From Step 3. The end!</span>
      </Step>
      {
        Object.entries(destinations).map(([stepName, goToStep]) => {
          return (
            <button key="stepName" onClick={goToStep}>
              Go to {stepName}
            </button>
          );
        });
      }
    </>
  );
};

const MyWizard = () => {
  return (
    <Wizard tree={tree} first="step1">
      <WizardInternals />
    </Wizard>
  );
};
```
