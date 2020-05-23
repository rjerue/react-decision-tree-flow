import { PropsWithChildren } from 'react';
import { Tree } from './Shared';
export interface StepProps<T> {
    name: keyof T;
}
/**
 * A Step to be used in the Wizard component. Will only be rendered if the name is the active step
 * @param props name of the step and children.
 */
export declare function Step<T extends Tree>({ children, name, }: PropsWithChildren<StepProps<T>>): JSX.Element;
