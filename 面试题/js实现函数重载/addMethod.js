function addMethod(obj, name, fn) {
  const old = obj[name];
  obj[name] = function (...args) {
    console.log(this === obj)
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === 'function') {
      return old.apply(this, args);
    }
  }
}

module.exports = addMethod