$(function () {
  $("#navbar").load('comp/navbar.html', function () {
    $('#about_nav a').eq(1).addClass('active')
  })
})