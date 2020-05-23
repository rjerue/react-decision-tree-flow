import React, { PropsWithChildren } from 'react';
import { Tree, WizardContext, WizardContextProps } from './Shared';

export interface ControlHook<T extends Tree, D extends any = any> {
  step: keyof T;
  tree: T;
  destinations: Record<keyof T, (data?: D) => void>;
  data?: D;
}

/**
 * A react hook that exposes the current step, possible destinations, passed data, and the tree
 * being used. Destinations is an object where the keys are possible destinations and the values are
 * functions to move the wizard there.
 */
export function useControls<T extends Tree, D extends any = any>(): ControlHook<
  T,
  D
> {
  const { getControls, step, tree, data } = React.useContext(
    WizardContext as React.Context<WizardContextProps<T, D>>
  );
  return { step, tree, destinations: getControls(), data: data || undefined };
}

export interface ControlProps<T extends Tree, D extends any = any> {
  children: (steps: ControlHook<T, D>) => React.ReactNode;
}

/**
 * Controls React Component
 * @param ChildrenRenderProp Children is a function that exposes the current step, possible destinations,
 * passed data, and the tree being used. Destinations is an object where the keys are possible destinations
 * and the values are functions to move the wizard there.
 */
export function Controls<T extends Tree, D extends any = any>({
  children,
}: PropsWithChildren<ControlProps<T>>) {
  const getControls = useControls<T, D>();
  return <>{children({ ...getControls })}</>;
}
