interface Options {
    /**
     * 指定调用在节流开始前
     */
    leading?: boolean;
    /**
     * 指定调用在节流结束后
     */
    trailing?: boolean;
}
declare const Throttle: <T = any, P = any>(func: (...any: any[]) => void, wait: number, options?: Options | undefined) => (this: T, ...params: P[]) => void;
export default Throttle;
