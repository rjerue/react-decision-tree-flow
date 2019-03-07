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
      {({ step }) => (
        <div>
          I am {step}
          <br />
          <Controls>
            {({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
          </Controls>
        </div>
      )}
    </Step>
    <Step name="step2">
      {({ step }) => (
        <div>
          I am step {step}
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
      )}
    </Step>
    <Step name="step3">
      {({ step }) => (
        <div>
          I am step {step}
          <br />
          <Controls>
            {({ step1 }) => <div onClick={step1}>Go to Step 1</div>}
          </Controls>
        </div>
      )}
    </Step>
    <Step name="error">
      {({ step }) => (
        <div>
          I am step {step}
          <br />
          <Controls>
            {({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
          </Controls>
        </div>
      )}
    </Step>
  </Wizard>
)

```

## Why?

Often times when looking for libraries to handle decision trees or wizards, I found plenty of libraries that were sequential; things that went in a nice step by step sequence.

Sadly, this isn't how things often work; total web of lies! Instead, things look more like a web such as this:

![Process Diagram](https://i.imgur.com/43ZaQL5.png)

That's not a line, that's a tree. As such, I've created a declarative decision tree.

## How?

There's three components to `react-decision-tree-flow` The **Wizard**, a **Step**, and **Controls**.

## Wizard

The Wizard needs to wrap everything because this is where the context lives. It needs two props: the **tree** and the **first** step. There is also an option **context** prop to set a default context.

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

This is a render prop that exposes the following:

- `step` -- the name of the step
- `context` -- a convenient context object passed from step to step
- `setContext` -- a function to change the convenient context object
- `tree` exposes the tree.

It's used like the context API

## Controls

The controls are the fun part, they're how the steps get changed. The Controls just have a render prop in the children that exposes whatever you inputted into the tree. Step 1 for example would expose `step2()` and `sideshow()` that you could then call whenever you wanted. Keys may be aliased as objects too as demonstrated in the above example.

## Wow! How dare you make this opinionated

I even expose the `WizardContext` so you can progromatically break it and ignore my opions. It contains the following:

```
{
  tree: {}, // the tree object
  step: null, // the step that the wizard is on
  context: {} // the convenient context
}
```
