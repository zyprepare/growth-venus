/*
 * OBJECT ASSIGN DEEP
 * Allows deep cloning of plain objects that contain primitives, nested plain objects, or nested plain arrays.
 */

/*
 * A unified way of returning a string that describes the type of the given variable.
 */
function getTypeOf(input) {
  if (input === null) {
    return 'null'
  }

  if (typeof input === 'undefined') {
    return 'undefined'
  }

  if (typeof input === 'object') {
    return Array.isArray(input) ? 'array' : 'object'
  }

  return typeof input
}

/*
 * Branching logic which calls the correct function to clone the given value base on its type.
 */
function cloneValue(value) {
  // The value is an object so lets clone it.
  if (getTypeOf(value) === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return quickCloneObject(value)
  }

  // The value is an array so lets clone it.
  if (getTypeOf(value) === 'array') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return quickCloneArray(value)
  }

  // Any other value can just be copied.
  return value
}

/*
 * Enumerates the given array and returns a new array, with each of its values cloned (i.e. references broken).
 */
function quickCloneArray(input) {
  return input.map(cloneValue)
}

/*
 * Enumerates the properties of the given object (ignoring the prototype chain) and returns a new object, with each of
 * its values cloned (i.e. references broken).
 */
function quickCloneObject(input) {
  const output = {}

  Object.keys(input).forEach(key => {
    output[key] = cloneValue(input[key])
  })

  return output
}

/*
 * Does the actual deep merging.
 */
function executeDeepMerge(target, selfObjects, selfOptions?) {
  const options = {
    // Can be "merge" or "replace".
    arrayBehaviour:
      selfOptions && selfOptions.arrayBehaviour
        ? selfOptions.arrayBehaviour
        : 'replace'
  }

  // Ensure we have actual objects for each.
  const objects = selfObjects.map(object => object || {})
  const output = target || {}

  // Enumerate the objects and their keys.
  for (let oindex = 0; oindex < objects.length; oindex++) {
    const object = objects[oindex]
    const keys = Object.keys(object)

    for (let kindex = 0; kindex < keys.length; kindex++) {
      const key = keys[kindex]
      const value = object[key]
      const type = getTypeOf(value)
      const existingValueType = getTypeOf(output[key])

      if (type === 'object') {
        if (existingValueType !== 'undefined') {
          const existingValue =
            existingValueType === 'object' ? output[key] : {}
          output[key] = executeDeepMerge(
            {},
            [existingValue, quickCloneObject(value)],
            options
          )
        } else {
          output[key] = quickCloneObject(value)
        }
      } else if (type === 'array') {
        if (existingValueType === 'array') {
          const newValue = quickCloneArray(value)
          output[key] =
            options.arrayBehaviour === 'merge'
              ? output[key].concat(newValue)
              : newValue
        } else {
          output[key] = quickCloneArray(value)
        }
      } else {
        output[key] = value
      }
    }
  }

  return output
}

/*
 * Merge all the supplied objects into the target object, breaking all references, including those of nested objects
 * and arrays, and even objects nested inside arrays. The first parameter is not mutated unlike Object.assign().
 * Properties in later objects will always overwrite.
 */
export const objectAssignDeep = (target, ...objects) => {
  return executeDeepMerge(target, objects)
}

/*
 * Same as objectAssignDeep() except it doesn't mutate the target object and returns an entirely new object.
 */
export const objectAssignDeepInto = (...objects) => {
  return executeDeepMerge({}, objects)
}

/*
 * Allows an options object to be passed in to customise the behaviour of the function.
 */
export const withOptions = (target, objects, options) => {
  return executeDeepMerge(target, objects, options)
}
