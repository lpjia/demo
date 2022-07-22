$(function () {

  $("#navbar").load('comp/navbar.html', function () {
    $('#about_nav a').eq(1).addClass('active')
  })

  // // 修复导航活跃样式 s
  // $(window).on('scroll', function () {
  //   let pageName = location.pathname ///contact.html
  //     , idx = null
  //   switch (pageName) {
  //     case 'about':
  //       idx = 1
  //       break;
  //     case 'culture':
  //       idx = 2
  //       break;
  //     case 'school':
  //       idx = 3
  //       break;

  //     default:
  //       break;
  //   }

  //   $('#about_nav a').eq(idx).addClass('active')
  // });
  // // 修复导航活跃样式 e


  // 跳转公司详情 s
  $('.company_list .sec').click(function () {
    location.href = 'subcompany.html'
  })
  // 跳转公司详情 e

})