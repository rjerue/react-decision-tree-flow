import React, { Component } from "react";
import { WizardContext, isKeyInList } from "./Wizard";

class Step extends Component {
  render() {
    const { name, children } = this.props;
    return (
      <WizardContext.Consumer>
        {({ step, context, setContext, tree, treeKeys }) => {
          if (!step) {
            return null;
          }
          isKeyInList(treeKeys, name);
          return step === name
            ? children({ setContext, context, tree, step })
            : null;
        }}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
