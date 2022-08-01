window.onload = function () {

  /*
  关于事件的传播，网景公司和微软公司有不同的理解，
  - 微软认为事件是由内向外传播的，当事件被触发时，应该先触发当前元素上的事件，
  然后再向当前元素的祖先元素传播，事件应该在冒泡阶段执行。
  - 网景公司认为事件应该是由外向内传播的，当事件被触发时，
  应该先触发当前元素的最外成的祖先元素的事件，然后再向内传播给后代元素。
  W3C：综合了两个公司的方法，将事件的传播分成三个阶段，
      - 捕获阶段：从最外层的祖先元素开始，向目标元素进行事件的捕获，默认此时不会触发事件
      - 目标阶段：事件捕获到了目标元素，捕获结束，开始在目标元素上触发事件。
      - 冒泡阶段：事件从目标元素向祖先元素传递，依次触发祖先元素上的事件。
  如果希望在捕获阶段就触发事件，可以将addEventListener()方法的第三个参数设置为true
  一般情况下不会希望在捕获阶段触发事件，所以第三个参数一般为false。
  在ie8及以下的浏览器中没有捕获阶段。
  */

  function bindEvent(dom, eventStr, callback) {
    if (dom.addEventListener) {
      dom.addEventListener(eventStr, callback, false);
    } else if (el.attachEvent) { // 兼容 ie
      dom.attchEvent("on" + eventStr, function () {
        callback.call(dom);
      });
    }
  }
  // 默认是事件冒泡

  let box = document.getElementById("box");
  let boxone = document.getElementById("boxone");
  let boxtwo = document.getElementById("boxtwo");

  bindEvent(box, "click", function () {
    console.log("我是box的响应函数");
  });
  bindEvent(boxone, "click", function () {
    console.log("我是boxone的响应函数");
  });
  bindEvent(boxtwo, "click", function (e) {
    // e.stopPropagation(); // 停止传播
    console.log("我是boxtwo的响应函数");
  });


}


$(function () {

  function callback(e) {
    $(this).addClass('lp_active').siblings().removeClass('lp_active')
  }

  /**
   * 事件委托
   * 不用每一个 li 都绑定一个事件, 只需借助事件冒泡, 
   * 事件从目标元素向祖先元素传递，依次触发祖先元素上的事件。
   */
  $('ul').on('click', 'li', callback)
})