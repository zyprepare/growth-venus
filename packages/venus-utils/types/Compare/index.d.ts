/**
 * 版本号比较
 * @param preVersion
 * @param lastVersion
 * @returns 0/1/-1
 */
export declare const versionCompare: (preVersion?: string, lastVersion?: string) => number;
/**
 * @desc 日期比较
 * @param time1 时间
 * @param time2 时间
 * @param  sign 符号
 * @return 0/1/-1
 */
export declare function dateCompare(time1?: string, time2?: string, sign?: string): 1 | -1 | 0;
