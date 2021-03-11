export interface CustomConfig {
    input?: string;
    output?: string;
    cssModuels?: object | boolean;
    plugins?: Array<any>;
    tsconfig?: string;
    ENV?: object;
    aliasEntries?: object;
    externalPackages?: Array<string>;
}
