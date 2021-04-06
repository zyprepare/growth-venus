import { CustomConfig } from './types';
export declare const setResolveFile: (basePath: string) => (...pathSegments: string[]) => string;
export declare const getConfig: () => CustomConfig;
export declare const getPackageVersion: () => any;
export declare const logPackageVersion: () => void;
