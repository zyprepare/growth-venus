declare class Init {
    config: any;
    memFsEditor: any;
    constructor(options: any);
    create(): void;
    inquire(): any;
    /**
     * 模板替换
     * @param {string} source 源文件路径
     * @param {string} dest 目标文件路径
     * @param {object} data 替换文本字段
     */
    injectTemplate(source: any, dest: any, data: any): void;
    generate(): void;
}
export default Init;
