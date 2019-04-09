import React from "react";
import { isKeyInList, error, doMiddleware } from './utils'

const init = () => ({
  tree: {},
  step: null,
  middleware: []
});

export const WizardContext = React.createContext(init());

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...init(), treeKeys: [] };
  }

  componentDidMount() {
    const { tree, first, middleware = [], noFirst = false } = this.props;
    const treeKeys = Object.keys(tree);
    isKeyInList(treeKeys, first, "First Step Missing from Tree List!");
    if(!(typeof middleware === 'function' || (Array.isArray(middleware) && (middleware.length === 0 || middleware.every(mwFunc => typeof mwFunc === 'function' ))))){
      error('Unknown Middleware. Did you pass in a function or array of functions?')
    }
    if(!noFirst){
      doMiddleware(middleware, first, this.setStep, tree)
    }
    this.setState({ step: first, treeKeys, tree });
  }

  setStep = step => {
    this.setState({ step });
  };

  render() {
    const { children, middleware } = this.props;
    return (
      <WizardContext.Provider
        value={{
          ...this.state,
          middleware,
          setStep: this.setStep,
        }}
      >
        {children}
      </WizardContext.Provider>
    );
  }
}

export default Wizard;
