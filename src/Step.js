import React, { Component } from "react";
import { WizardContext } from "./Wizard";
import { isKeyInList } from './utils'
class Step extends Component {
  render() {
    const { name, children } = this.props;
    return (
      <WizardContext.Consumer>
        {({ step, treeKeys }) => {
          if (!step) {
            return null;
          }
          isKeyInList(treeKeys, name);
          return step === name
            ? children
            : null;
        }}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
