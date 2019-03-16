import React, { Component } from "react";
import { Wizard, Step, Controls } from "../src/";

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

class App extends Component {
  render() {
    return (
      <div>
        <Wizard first="step1" tree={tree}>
          {Object.keys(tree).map(key => (
            <Step name={key} key={key}>
              <Controls>
                {({ tree, step, setContext, setStep, ...places }) => (
                  <div>
                    I am {step}
                    <br />
                    {Object.entries(places).map(([key, value]) => (
                      <div key={key} onClick={value}>
                        GO TO {key}
                      </div>
                    ))}
                  </div>
                )}
              </Controls>
            </Step>
          ))}
        </Wizard>
      </div>
    );
  }
}

export default App;
