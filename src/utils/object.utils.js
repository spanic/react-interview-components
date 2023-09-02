export function isEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}
