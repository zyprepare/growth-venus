/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export default function Debounce<T = any, P = any>(func: (...any: any[]) => void, wait: number, immediate?: boolean): (this: T, ...params: P[]) => void;
