$(function () {

  $("#navbar").load('comp/navbar.html', function () {
    $('#about_nav a').eq(4).addClass('active')
  })
})