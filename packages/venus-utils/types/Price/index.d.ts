/**
 * 用于处理商品价格，分割整数和小数部分
 *
 * @param  {String || Float}  price          商品价格
 * @param  {Number}           decimalPlaces  要保留的小数位数
 *
 * @return {Object}  { whole: 完整价格, int: 整数部分, decimal: 小数部分 }
 *
 */
export declare const SetPrice: (price: any, decimalPlaces?: any) => {
    whole: any;
    int: any;
    decimal: string;
};
/**
 * 以.为分隔符，显示价格位置
 * @param {String} price 价格
 */
export declare const SplitPrice: (price: any) => {
    int: any;
    decimal: any;
    whole: any;
};
