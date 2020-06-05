import React from 'react';

export interface Tree {
  readonly [step: string]: readonly string[];
}

export type ControlType<T extends Tree> = Record<keyof T, () => void>;

export interface WizardContextProps<T extends Tree, D extends any = any> {
  tree: T;
  step: string;
  getControls: () => ControlType<T>;
  data: D | null;
  back: (data?: D) => void;
}

export const WizardContext = React.createContext<WizardContextProps<any>>({
  tree: {},
  step: '',
  getControls: () => ({}),
  data: {},
  back: () => {},
});
