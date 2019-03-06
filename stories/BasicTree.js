import React from "react";
import { Wizard, Step, Controls } from "../src/";

const tree = {
  step1: ["step2"],
  step2: ["step3", "error"],
  step3: ["step1"],
  error: ["step2"]
};

const App = () => (
  <Wizard tree={tree} first="step1">
    <Step
      name="step1"
      render={({ step }) => (
        <div>
          I am {step}
          <br />
          <Controls
            render={({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
          />
        </div>
      )}
    />
    <Step
      name="step2"
      render={({ step }) => (
        <div>
          I am step {step}
          <br />
          <Controls
            render={({ step3, error }) => (
              <div>
                <div onClick={error}>Go to error</div>
                <div onClick={step3}>Go to Step 3</div>
              </div>
            )}
          />
        </div>
      )}
    />
    <Step
      name="step3"
      render={({ step }) => (
        <div>
          I am step {step}
          <br />
          <Controls
            render={({ step1 }) => <div onClick={step1}>Go to Step 1</div>}
          />
        </div>
      )}
    />
    <Step
      name="error"
      render={({ step }) => (
        <div>
          I am step {step}
          <br />
          <Controls
            render={({ step2 }) => <div onClick={step2}>Go to Step 2</div>}
          />
        </div>
      )}
    />
  </Wizard>
);

export default App;
