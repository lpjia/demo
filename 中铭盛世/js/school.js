$(function () {

  $("#navbar").load('comp/navbar.html', function () {
    $('#about_nav a').eq(3).addClass('active')
  })

  Page({
    num: 2,					//页码数
    startnum: 1,				//指定页码
    elem: $('#page'),		//指定的元素
    callback: function (n) {	//回调函数
      console.log(n);
    }
  });


})