import { PropsWithChildren, ReactElement } from 'react';
import { Tree } from './Shared';
export interface WizardProps<T extends Tree, D extends any = any> {
    tree: T;
    first: keyof T;
    initialData?: D | null;
}
/**
 * Declarative Wizard component for React.
 * @param props Takes in a tree, the first step of the wizard, and children.
 */
export declare function Wizard<T extends Tree, D = any>({ children, tree, first, initialData, }: PropsWithChildren<WizardProps<T, D>>): ReactElement;
