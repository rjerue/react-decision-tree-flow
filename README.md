# React Decision Tree

## Quick start

`yarn add react-decision-tree-flow`

[Demo](https://rjerue.github.io/react-decision-tree-flow)

code

```
import { Wizard, Step, Controls } from "react-decision-tree-flow";

const tree = {
  step1: ["step2"],
  step2: ["step3", "error"],
  step3: ["step1"],
  error: ["step2"]
};

const App = () => (
  <Wizard tree={tree} first="step1">
    <Step name="step1">
      <div>
        I am step 1
        <br />
        <Controls>
          {({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
        </Controls>
      </div>
    </Step>
    <Step name="step2">
      <div>
        I am step 2
        <br />
        <Controls>
          {({ step3, error }) => (
            <div>
              <div onClick={error}>Go to error</div>
              <div onClick={step3}>Go to Step 3</div>
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
          {({ step1 }) => <div onClick={step1}>Go to Step 1</div>}
        </Controls>
      </div>
    </Step>
    <Step name="error">
      <div>
        I am step 4
        <br />
        <Controls>
          {({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
        </Controls>
      </div>
    </Step>
  </Wizard>
);

```

## Why?

Often times when looking for libraries to handle decision trees or wizards, I found plenty of libraries that were sequential; things that went in a nice step by step sequence.

Sadly, this isn't how things often work; total web of lies! Instead, things look more like a web such as this:

![Process Diagram](https://i.imgur.com/43ZaQL5.png)

That's not a line, that's a tree. As such, I've created a declarative decision tree.

## How?

There's three components to `react-decision-tree-flow` The **Wizard**, a **Step**, and **Controls**. Controls may also be exposed as a `useControls` hook.

## Wizard

The Wizard needs to wrap everything because this is where the context lives. It needs two props: the **tree** and the **first** step. The wizard has an optional third prop called `middleware` for middleware that runs after each step. You pay pass in a function or an array of functions. There is a `noFirst` prop to skip running middleware on the first step. The `middleware` function takes in the params `step, setStep, tree`. `Step` is the current step, `setStep` is a function to change the step (pass in new step), and `tree` is the tree passed into the wizard.

#### Tree

The tree is an object, it's keys are the steps in the wizard. Each key's value is an array to the other steps in the Wizard. Alternatively, you may input an object into the key and it will alias the value in that object. Here's an example Tree:

```
const tree = {
  step1: ["step2", "sideshow"],
  sideshow: ["step3", { previous: "step2" }],
  step2: ["step3", "error"],
  step3: ["step1"],
  error: ["step2"]
};
```

- Step 1 goes to step 2 or sideshow
- Sideshow goes to step3 by a call to `step3()`. It can return to step2 with a call to `previous()`. More on this later.
- Step 2 brings you to step 3, or the error step
- Step 3 brings you to step 1
- Error brings you to step 2

#### First

This one is pretty easy, it's just what the first step of the tree is. In the above example you'd just have the prop passed down as `first="step1"` to start at step1

## Step

Steps are what make up elements in the Wizard. They have one prop: a **name**.

#### Name

This is just the name of the step. It needs to line up with some value in the `tree`'s keys.

#### Rendering Steps

This will be the step that is currently active

## Controls

The controls are the fun part, they're how the steps get changed. The Controls just have a render prop in the children that exposes whatever you inputted into the tree. Step 1 for example would expose `step2()` and `sideshow()` that you could then call whenever you wanted. Keys may be aliased as objects too as demonstrated in the above example. The `tree` and current `step` are also exposed.

## Hooks

The `useControls` hook is useful to get the controls anywhere while in a Wizard's context. It may be used as a subsititue to `Controls` and exposes the same things.

## Wow! How dare you make this opinionated

I even expose the `WizardContext` so you can progromatically break it and ignore my opions. It contains the following:

```
{
  tree: {}, // the tree object
  step: null, // the step that the wizard is on
}
```

There's also a `useWizardContext` hook that exposes everything in the Wizard's context object.