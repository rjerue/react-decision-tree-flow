import React, { PropsWithChildren } from 'react';
import { Tree } from './Shared';
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
export declare function useControls<T extends Tree, D extends any = any>(): ControlHook<T, D>;
export interface ControlProps<T extends Tree, D extends any = any> {
    children: (steps: ControlHook<T, D>) => React.ReactNode;
}
/**
 * Controls React Component
 * @param ChildrenRenderProp Children is a function that exposes the current step, possible destinations,
 * passed data, and the tree being used. Destinations is an object where the keys are possible destinations
 * and the values are functions to move the wizard there.
 */
export declare function Controls<T extends Tree, D extends any = any>({ children, }: PropsWithChildren<ControlProps<T>>): JSX.Element;
