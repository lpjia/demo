/* 制作插件
添加方法到jQuery原型对象上, 也就是$.fn, 等价于jQuery.fn */
$.fn.extend({
  check: function () {
    // console.log('this:', this) // this指向$(sel)元素集合
    return this.each(function () { // 等价于$(sel).each()
      // console.log('this2:', this) // this指向dom
      this.checked = true;
    });
  },
  uncheck: function () {
    return this.each(function () {
      this.checked = false;
    });
  }
});

$(function () {

  $("input[type=checkbox]").check();
  $("input[type=radio]").uncheck();

})