declare type StyleType = 'css' | 'less' | 'scss' | 'sass';
/**
 * 样式文件转换为 css module 文件格式
 * @param styleType
 */
export declare const toCssModuleFile: (styleType: StyleType) => void;
export {};
