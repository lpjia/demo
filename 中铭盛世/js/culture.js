$(function () {


  // 筛选条件 s
  $('.type').on('click', 'a', function () {
    if ($(this).hasClass('lp_active')) return false

    $(this).siblings('.lp_active').removeClass('lp_active')
    $(this).addClass('lp_active')
  })

  $('.area').on('click', 'a', function () {
    if ($(this).hasClass('lp_active')) return false
    $(this).siblings('.lp_active').removeClass('lp_active')
    $(this).addClass('lp_active')
  })

  $('.year').on('click', 'a', function () {
    if ($(this).hasClass('lp_active')) return false
    $(this).siblings('.lp_active').removeClass('lp_active')
    $(this).addClass('lp_active')
  })
  // 筛选条件 e


  // 切换正在热映 s
  $('.latest .tab').on('click', 'div', function () {
    if ($(this).hasClass('lp_active')) return false

    $(this).siblings('.lp_active').removeClass('lp_active')
    $(this).addClass('lp_active')

    var idx = $(this).attr('data-idx')

    $('.img_list').children().remove()
    $('.latest ul').children().remove()

    if (idx === 'soon') {
      for (let index = 0; index < 3; index++) {
        $('.img_list').append(`<div class="col-lg-2">
          <img src="img/culture/coming_soon.png" alt="">
        </div>`)
      }

      $('.latest ul').append(`<li class="lp_active" data-idx="1"></li>`)

    } else {
      for (let index = 0; index < 5; index++) {
        $('.img_list').append(`<div class="col-lg-2">
          <img src="img/culture/showing_1.png" alt="">
        </div>`)
      }

      $('.latest ul').append(`<li class="lp_active" data-idx="1"></li>
        <li data-idx="2"></li>`)
    }
  })
  // 切换正在热映 e


  // 影视作品 s
  $('.latest ul').on('click', 'li', function () {
    if ($(this).hasClass('lp_active')) return false

    $(this).siblings('.lp_active').removeClass('lp_active')
    $(this).addClass('lp_active')

    var idx = $(this).attr('data-idx')

    $('.img_list img').each(function (index, item) {
      if (idx == 1)
        $(item).attr('src', 'img/culture/showing_1.png')
      else
        $(item).attr('src', 'img/culture/showing_2.png')

    })
  })
  // 影视作品 e



})