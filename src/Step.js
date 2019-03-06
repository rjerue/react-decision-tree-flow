import React, { Component } from "react";
import { WizardContext, isKeyInList } from "./Wizard";

class Step extends Component {
  render() {
    const { name, render: renderProp } = this.props;
    return (
      <WizardContext.Consumer>
        {({ step, context, setContext, tree, treeKeys }) => {
          if (!step) {
            return null;
          }
          isKeyInList(treeKeys, name);
          return step === name ? (
            <React.Fragment>
              {renderProp({ setContext, context, tree, step })}
            </React.Fragment>
          ) : null;
        }}
      </WizardContext.Consumer>
    );
  }
}

export default Step;
