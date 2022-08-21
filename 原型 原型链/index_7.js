function fn() { }

console.log(fn.prototype) // {constructor: fn}
console.log(fn.prototype.constructor === fn) // true