import React, { Component } from "react";
import { Wizard, Step, useControls } from "../src/";

const tree = {
  step1: ["step2", "sideshow"],
  sideshow: [
    "step2",
    { previous: "step2", next: "step3" },
    { rawr: "error" },
    "step3"
  ],
  step2: ["step3", "error"],
  step3: ["step1"],
  error: ["step2"]
};

const StepComp = ({ value }) => {
  const { step, tree, ...steps } = useControls();
  return (
    <Step name={value}>
      <div>
        I am {step}
        <br />
        {Object.entries(steps).map(([key, value]) => (
          <div key={key} onClick={value}>
            GO TO {key}
          </div>
        ))}
      </div>
    </Step>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Wizard first="step1" tree={tree}>
          {Object.keys(tree).map(key => (
            <StepComp key={key} value={key} />
          ))}
        </Wizard>
      </div>
    );
  }
}

export default App;
