import React from 'react';
import { Tree, ControlType, WizardContext } from './Shared';

export interface WizardProps<T extends Tree, D extends any = any> {
  tree: T;
  first: keyof T;
  initialData?: D | null;
}

interface WizardState<T extends Tree, D extends any = any> {
  step: keyof T;
  data?: D;
}

interface ReducerState<T extends Tree, D extends any = any> {
  active: WizardState<T, D>;
  history: WizardState<T, D>[];
}

type ReducerAction<T extends Tree, D extends any = any> =
  | { type: 'SET_STEP'; data?: D; step: keyof T }
  | { type: 'STEP_BACK'; data?: D };

function reducer<T extends Tree, D extends any = any>(
  state: ReducerState<T, D>,
  action: ReducerAction<T, D>
): ReducerState<T, D> {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        history: [state.active, ...state.history],
        active: { step: action.step, data: action.data },
      };
    case 'STEP_BACK':
      const [previous, ...history] = state.history;
      return {
        ...state,
        active: {
          step: previous.step,
          data: action.data,
        },
        history,
      };
    default:
      return state;
  }
}

/**
 * Declarative Wizard component for React.
 * @param props Takes in a tree, the first step of the wizard, and children.
 */
export function Wizard<T extends Tree, D = any>({
  children,
  tree,
  first,
  initialData = null,
}: React.PropsWithChildren<WizardProps<T, D>>): React.ReactElement {
  const [
    {
      active: { step, data },
    },
    dispatch,
  ] = React.useReducer<React.Reducer<ReducerState<T, D>, ReducerAction<T, D>>>(
    reducer,
    {
      active: {
        step: first,
        data: initialData || undefined,
      },
      history: [],
    }
  );

  React.useEffect(() => {
    const allSteps = Object.keys(tree);
    if (!allSteps.includes(first as string)) {
      console.warn(`First step ${first} is now found in tree as key`);
    }
  }, [first, tree]);
  React.useEffect(() => {
    const allSteps = Object.keys(tree);
    Object.entries(tree).forEach(([key, dests]) => {
      dests.forEach(d => {
        if (!allSteps.includes(d)) {
          console.warn(
            `Tree definition includes path to ${d} from ${key}. However ${d} is not in tree as a key.`
          );
        }
      });
    });
  }, [tree]);

  const getControls = () => {
    const possibleSteps = tree[step];
    return possibleSteps.reduce<ControlType<T>>((accum, step) => {
      const next = {
        [step]: (data?: D) => {
          dispatch({ type: 'SET_STEP', step, data });
        },
      };
      return {
        ...accum,
        ...next,
      };
    }, {} as ControlType<T>);
  };

  const back = (backData?: D) => {
    dispatch({ type: 'STEP_BACK', data: backData || data });
  };

  return (
    <WizardContext.Provider
      value={{
        tree,
        step: step as string,
        back,
        getControls: getControls as () => Record<string, any>,
        data,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}
