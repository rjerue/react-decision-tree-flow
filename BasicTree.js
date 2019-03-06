import React, { Component } from "react";
import { Wizard, Step, Controls } from "../src/";

const tree = {
  step1: ["step2", "sideshow"],
  sideshow: ["step2", { previous: "step2" }],
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
            <Step
              name={key}
              key={key}
              render={({ step }) => (
                <div>
                  I am {step}
                  <br />
                  <Controls
                    render={({ tree, step, setContext, setStep, ...places }) =>
                      Object.entries(places).map(([key, value]) => (
                        <div key={key} onClick={value}>
                          GO TO {key}
                        </div>
                      ))
                    }
                  />
                </div>
              )}
            />
          ))}
        </Wizard>
      </div>
    );
  }
}

export default App;
