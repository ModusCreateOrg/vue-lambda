function customizer(objValue, srcValue) {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
  if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
    return srcValue;
  }
}

export default customizer;
