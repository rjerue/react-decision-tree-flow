import React from 'react';
export interface Tree {
    readonly [step: string]: readonly string[];
}
export declare type ControlType<T extends Tree> = Record<keyof T, () => void>;
export interface WizardContextProps<T extends Tree, D extends any = any> {
    tree: T;
    step: string;
    getControls: () => ControlType<T>;
    data: D | null;
    back: (data?: D) => void;
}
export declare const WizardContext: React.Context<WizardContextProps<any, any>>;
