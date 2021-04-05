/**
 * 验证图片有效性
 * @param {String} url
 */
export declare const validImgUrl: (url: string) => string;
export declare const imgHttpsAdd: (url: string) => string;
/**
 * 格式化图片
 * @param {String} url 图片地址
 * @param {String} width 图片宽
 * @param {Boolean} height 图片高，默认等于宽
 * @param {String} cut 居中裁剪参数 例如：200x200
 */
export declare const parseImgUrl: (url: string, width?: number | undefined, height?: number | undefined, cut?: string | undefined) => string;
