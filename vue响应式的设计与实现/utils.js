export function isObject(value) {
  return typeof value === 'object' && value !== null
}

export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}