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

export default App;
