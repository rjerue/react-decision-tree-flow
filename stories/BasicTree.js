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
);

export default App;
