$(function () {

  Page({
    num: 7,					//页码数
    startnum: 6,				//指定页码
    elem: $('#page'),		//指定的元素
    callback: function (n) {	//回调函数
      console.log(n);
    }
  });


})