import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var WizardContext = /*#__PURE__*/React.createContext({
  tree: {},
  step: '',
  getControls: function getControls() {
    return {};
  },
  data: {},
  back: function back() {}
});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return _extends({}, state, {
        history: [state.active].concat(state.history),
        active: {
          step: action.step,
          data: action.data
        }
      });

    case 'STEP_BACK':
      var _state$history = state.history,
          previous = _state$history[0],
          history = _state$history.slice(1);

      return _extends({}, state, {
        active: {
          step: previous.step,
          data: action.data
        },
        history: history
      });

    default:
      return state;
  }
}
/**
 * Declarative Wizard component for React.
 * @param props Takes in a tree, the first step of the wizard, and children.
 */


function Wizard(_ref) {
  var children = _ref.children,
      tree = _ref.tree,
      first = _ref.first,
      _ref$initialData = _ref.initialData,
      initialData = _ref$initialData === void 0 ? null : _ref$initialData;

  var _React$useReducer = React.useReducer(reducer, {
    active: {
      step: first,
      data: initialData || undefined
    },
    history: []
  }),
      _React$useReducer$0$a = _React$useReducer[0].active,
      step = _React$useReducer$0$a.step,
      data = _React$useReducer$0$a.data,
      dispatch = _React$useReducer[1];

  React.useEffect(function () {
    var allSteps = Object.keys(tree);

    if (!allSteps.includes(first)) {
      console.warn("First step " + first + " is now found in tree as key");
    }
  }, [first, tree]);
  React.useEffect(function () {
    var allSteps = Object.keys(tree);
    Object.entries(tree).forEach(function (_ref2) {
      var key = _ref2[0],
          dests = _ref2[1];
      dests.forEach(function (d) {
        if (!allSteps.includes(d)) {
          console.warn("Tree definition includes path to " + d + " from " + key + ". However " + d + " is not in tree as a key.");
        }
      });
    });
  }, [tree]);

  var getControls = function getControls() {
    var possibleSteps = tree[step];
    return possibleSteps.reduce(function (accum, step) {
      var _next;

      var next = (_next = {}, _next[step] = function (data) {
        dispatch({
          type: 'SET_STEP',
          step: step,
          data: data
        });
      }, _next);
      return _extends({}, accum, {}, next);
    }, {});
  };

  var back = function back(backData) {
    dispatch({
      type: 'STEP_BACK',
      data: backData || data
    });
  };

  return React.createElement(WizardContext.Provider, {
    value: {
      tree: tree,
      step: step,
      back: back,
      getControls: getControls,
      data: data
    }
  }, children);
}

/**
 * A react hook that exposes the current step, possible destinations, passed data, and the tree
 * being used. Destinations is an object where the keys are possible destinations and the values are
 * functions to move the wizard there.
 */

function useControls() {
  var _React$useContext = React.useContext(WizardContext),
      getControls = _React$useContext.getControls,
      step = _React$useContext.step,
      tree = _React$useContext.tree,
      data = _React$useContext.data,
      back = _React$useContext.back;

  var backFunction = function backFunction(newData) {
    back(newData);
  };

  return {
    step: step,
    tree: tree,
    destinations: getControls(),
    data: data || undefined,
    back: backFunction
  };
}
/**
 * Controls React Component
 * @param ChildrenRenderProp Children is a function that exposes the current step, possible destinations,
 * passed data, and the tree being used. Destinations is an object where the keys are possible destinations
 * and the values are functions to move the wizard there.
 */

function Controls(_ref) {
  var children = _ref.children;
  var getControls = useControls();
  return React.createElement(React.Fragment, null, children(_extends({}, getControls)));
}

/**
 * A Step to be used in the Wizard component. Will only be rendered if the name is the active step
 * @param props name of the step and children.
 */

function Step(_ref) {
  var children = _ref.children,
      name = _ref.name;

  var _useControls = useControls(),
      step = _useControls.step,
      tree = _useControls.tree; // Check if name is bad value


  React.useEffect(function () {
    if (!Object.keys(tree).includes(name)) {
      console.warn("Step component with name " + name + " is not found in step tree!");
    }
  }, [name, tree]);
  return React.createElement(React.Fragment, null, step === name && children);
}

export { Controls, Step, Wizard, WizardContext, useControls };
//# sourceMappingURL=react-decision-tree-flow.esm.js.map
