
export const error = (msg = "") => {
  throw new Error(`react-decision-tree-flow error! ${msg}`.trim());
};

export const isKeyInList = (list, key, msg) => {
  if (!list.some(value => key === value)) {
    error(msg || `Step ( ${key} ) Missing from Tree List!`);
  }
};

export const doMiddleware = (middleware, step, setStep, tree) => {
    if(typeof middleware === 'function'){
      middleware(step, setStep, tree)
    } 
    else if(Array.isArray(middleware)){
      middleware.forEach( mwFunction => mwFunction(step, setStep, tree))
    }
    else{
      error('Unknown Middleware')
    }
}

export const getControls = (tree, step, treeKeys = [], setStep = () => null, middleware = []) => (tree[step] || []).reduce((agg, to) => {
  if (!to) {
    error(
      "Elements in tree array must be Objects or strings. Value was falsey!"
    );
  }
  if (typeof to === "string") {
    isKeyInList(treeKeys, to);
    return { ...agg, [to]: () => {
      doMiddleware(middleware, step, setStep, tree)
      setStep(to)
    } };
  } else if (typeof to === "object") {
    return {
      ...agg,
      ...Object.entries(to).reduce((agg2, [key, value]) => {
        if (typeof value !== "string") {
          error("Nested objects must have keys of type string!");
        }
        isKeyInList(treeKeys, value);
        return { ...agg2, [key]: () => {
          doMiddleware(middleware)
          setStep(value)
        } };
      }, {})
    };
  } else {
    error("Elements in tree array must be Objects or strings");
  }
}, {tree, step})