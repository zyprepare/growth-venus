export interface CustomConfig {
  input?: string,
  output?: string,
  cssModules?: object | boolean,
  plugins?: Array<any>,
  tsconfig?: string,
  ENV?: object,
  aliasEntries?: object,
  externalPackages?: Array<string>
}
