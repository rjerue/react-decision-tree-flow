import React, { Component } from "react";
import { isKeyInList } from './utils'

const init = () => ({
  tree: {},
  step: null
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

  render() {
    const { children } = this.props;
    return (
      <WizardContext.Provider
        value={{
          ...this.state,
          setStep: this.setStep,
        }}
      >
        {children}
      </WizardContext.Provider>
    );
  }
}

export default Wizard;
