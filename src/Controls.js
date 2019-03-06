import React, { Component } from "react";
import { WizardContext, error, isKeyInList } from "./Wizard";

class Controls extends Component {
  render() {
    return (
      <WizardContext.Consumer>
        {({ setStep, tree = {}, step = "", setContext, treeKeys }) =>
          this.props.render(
            (tree[step] || []).reduce(
              (agg, to) => {
                if (!to) {
                  error(
                    "Elements in tree array must be Objects or strings. Value was falsey!"
                  );
                }
                if (typeof to === "string") {
                  isKeyInList(treeKeys, to);
                  return { ...agg, [to]: () => setStep(to) };
                } else if (typeof to === "object") {
                  return {
                    ...agg,
                    ...Object.entries(to).reduce((agg2, [key, value]) => {
                      if (typeof value !== "string") {
                        throw new Error(
                          "react-decision-tree error! nested objects must have keys of type string!"
                        );
                      }
                      isKeyInList(treeKeys, value);
                      return { ...agg2, [key]: () => setStep(value) };
                    }, {})
                  };
                } else {
                  error("Elements in tree array must be Objects or strings");
                }
              },
              { setContext, tree, step, setStep }
            )
          )
        }
      </WizardContext.Consumer>
    );
  }
}

export default Controls;
