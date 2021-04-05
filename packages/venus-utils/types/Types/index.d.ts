declare type NonFalsy<T> = T extends null | undefined | false | '' ? never : T;
declare const types: {
    nonNullish: <T extends unknown>(value: T) => value is NonNullable<T>;
    nonFalsy: <T_1 extends unknown>(value: T_1) => value is NonFalsy<T_1>;
};
export default types;
