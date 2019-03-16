import React, { Component } from "react";
import { WizardContext } from "./Wizard";
import { getControls } from './utils'

class Controls extends Component {
  render() {
    const { children = () => null } = this.props;
    return (
      <WizardContext.Consumer>
        {({ setStep, tree = {}, step = "", treeKeys }) =>
          children(getControls(tree, step, treeKeys, setStep))
        }
      </WizardContext.Consumer>
    );
  }
}

export default Controls;
