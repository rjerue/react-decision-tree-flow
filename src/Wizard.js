import React, { Component } from "react";

export const error = (msg = "") => {
  throw new Error(`react-decision-tree-flow error! ${msg}`.trim());
};

export const isKeyInList = (list, key, msg) => {
  if (!list.some(value => key === value)) {
    error(msg || `Step ( ${key} ) Missing from Tree List!`);
  }
};

const init = () => ({
  tree: {},
  step: null,
  context: {}
});

export const WizardContext = React.createContext(init());

class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = { ...init(), treeKeys: [] };
  }

  componentDidMount() {
    const { tree, first } = this.props;
    const treeKeys = Object.keys(tree);
    isKeyInList(treeKeys, first, "First Step Missing from Tree List!");
    this.setState({ step: first, treeKeys, tree });
  }

  setStep = step => {
    this.setState({ step });
  };

  setContext = context => {
    this.setState({ context });
  };

  render() {
    const { children } = this.props;
    return (
      <WizardContext.Provider
        value={{
          ...this.state,
          setStep: this.setStep,
          setContext: this.setContext
        }}
      >
        {children}
      </WizardContext.Provider>
    );
  }
}

export default Wizard;
