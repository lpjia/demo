var o = (function () {
  // 闭包保护了obj的完整性, 不会被外面修改
  var obj = {
    a: 1,
    b: 2,
  }
  return {
    get: function (k) {
      return obj[k]
    }
  }
})();
// 如何在不改变上面代码的情况下, 修改obj对象