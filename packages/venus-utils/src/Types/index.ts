type NonFalsy<T> = T extends null | undefined | false | '' ? never : T

const types = {
  nonNullish: <T extends unknown>(value: T): value is NonNullable<T> => {
    return value !== undefined && value !== null
  },
  nonFalsy: <T extends unknown>(value: T): value is NonFalsy<T> => {
    return Boolean(value)
  }
}

export default types
