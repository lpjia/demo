/* 手写 Promise.prototype.catch */
Promise.prototype.myCatch = function (onRejected) {
  return this.then(void 0, onRejected)
}