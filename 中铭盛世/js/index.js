// $(function () {
//   $('.company_list').on('click', '.sec', function () {
//     location.href = "subcompany.html"
//   })
// })



$(function () {

  // 隐藏下一屏按钮
  function hideArrow() {
    i == 4 ? $('.arrow').hide() : $('.arrow').show()
  }

  // 增加首尾不联动限制
  let isRun = true

  var i = 0;
  var $btn = $('.section-btn li'),
    $wrap = $('.section-wrap'),
    $arrow = $('.arrow');

  /*当前页面赋值*/
  function up() {
    isRun = true
    i++;
    if (i == $btn.length) {
      i--
      isRun = false
    };
  }
  function down() {
    isRun = true
    i--;
    if (i < 0) {
      i++
      isRun = false
    };
  }

  /*页面滑动*/
  function run() {
    if (!isRun) return false

    $btn.eq(i).addClass('on').siblings().removeClass('on');
    console.log($wrap.attr("class", "section-wrap"))
    $wrap.attr("class", "section-wrap").addClass(function () {
      return "put-section-" + i;
    }).find('.section').eq(i).find('.title').addClass('active');

  };

  /*右侧按钮点击*/
  $btn.each(function (index) {
    $(this).click(function () {
      i = index;
      run();
    })
  });

  /*翻页按钮点击*/
  $arrow.one('click', go);
  function go() {
    up(); run();

    hideArrow()

    setTimeout(function () {
      $arrow.one('click', go)
    }, 1000)
  };

  /*响应鼠标*/
  $wrap.one('mousewheel', mouse_);
  function mouse_(event) {
    if (event.deltaY < 0) { up() }
    else { down() }
    run();

    hideArrow()

    setTimeout(function () {
      $wrap.one('mousewheel', mouse_)
    }, 1000)
  };

  /*响应键盘上下键*/
  $(document).one('keydown', k);
  function k(event) {
    var e = event || window.event;
    var key = e.keyCode || e.which || e.charCode;
    switch (key) {
      case 38: down(); run();
        break;
      case 40: up(); run();
        break;
    };

    hideArrow()

    setTimeout(function () {
      $(document).one('keydown', k)
    }, 1000);
  }




});