import React, { Component } from "react";
import { WizardContext } from "./Wizard";
import { getControls } from './utils'

class Controls extends Component {
  render() {
    const { children = () => null } = this.props;
    return (
      <WizardContext.Consumer>
        {({ setStep, tree = {}, step = "", treeKeys, middleware }) =>
          children(getControls(tree, step, treeKeys, setStep, middleware))
        }
      </WizardContext.Consumer>
    );
  }
}

export default Controls;
