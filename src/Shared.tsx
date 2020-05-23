import React from 'react';

export interface Tree {
  readonly [step: string]: readonly string[];
}

export type ControlType<T extends Tree> = Record<keyof T, () => void>;

export interface WizardContextProps<T extends Tree, D extends any = any> {
  tree: T;
  step: string;
  setStep: React.Dispatch<React.SetStateAction<keyof T>>;
  getControls: () => ControlType<T>;
  data: D | null;
  setData: React.Dispatch<React.SetStateAction<D>>;
}

export const WizardContext = React.createContext<WizardContextProps<any>>({
  tree: {},
  step: '',
  setStep: () => {},
  getControls: () => ({}),
  data: {},
  setData: () => {},
});
