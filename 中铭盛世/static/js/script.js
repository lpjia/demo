$(window).on("load", function () {

  "use strict";

  /* ===================================
          Loading Timeout
   ====================================== */

  $('.side-menu').removeClass('hidden');

  // setTimeout(function () {
  //   $('.preloader').fadeOut();
  // }, 1000);

});


jQuery(function ($) {


  "use strict";

  // $(window).on('scroll', function () {
  //   // if ($(this).scrollTop() > 260) { // Set position from top to add class
  //   if ($(this).scrollTop() > 60) { // Set position from top to add class
  //     $('header').addClass('header-appear');
  //   }
  //   else {
  //     $('header').removeClass('header-appear');
  //   }
  // });

  //scroll to appear
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 500)
      $('.scroll-top-arrow').fadeIn('slow');
    else
      $('.scroll-top-arrow').fadeOut('slow');
  });

  //Click event to scroll to top
  $(document).on('click', '.scroll-top-arrow', function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

  // $(".scroll").on("click", function (event) {
  //   event.preventDefault();
  //   $("html,body").animate({
  //     scrollTop: $(this.hash).offset().top - 60
  //   }, 1200);
  // });



  // // 加的
  // /*$('#test1').mousewheel(function(event, delta, deltaX, deltaY) { // event : 事件 // delta : 滚动数量 正值向上，负值向下 }*/

  // //参数设定

  // var time = 1000;//切换时间
  // var ntime = 500//nav变换时间；


  // var siz = 0,
  //   flag = true,
  //   flag1 = true,
  //   hi = $(window).height();
  // var le = $('#content li').length;
  // $('html,body').mousewheel(function (event, delta, deltaX, deltaY) {

  //   if (delta < 0 && flag) {
  //     // 向下滚动
  //     flag = false;
  //     siz = $(window).scrollTop() > hi * (le - 1) ? hi * (le - 1) : hi + $(window).scrollTop();

  //     $('html,body').stop().animate({
  //       scrollTop: siz
  //     }, time, function () {
  //       flag = true;
  //     })
  //   } else {
  //     // 向上
  //     if (flag) {
  //       flag = false;
  //       siz = $(window).scrollTop() < hi * 2 ? 0 : $(window).scrollTop() - hi;
  //       $('html,body').stop().animate({
  //         scrollTop: siz
  //       }, time, function () {
  //         flag = true;
  //       })
  //     }
  //   }
  //   return false;
  // })

  // $('html,body').keydown(function (event) {
  //   if (event.keyCode == 40 && flag) {
  //     flag = false;
  //     siz = $(window).scrollTop() > hi * (le - 1) ? hi * (le - 1) : hi + $(window).scrollTop();

  //     $('html,body').stop().animate({
  //       scrollTop: siz
  //     }, time, function () {
  //       flag = true;
  //     })
  //   } else if (event.keyCode == 38 && flag) {
  //     if (flag) {
  //       flag = false;
  //       siz = $(window).scrollTop() < hi * 2 ? 0 : $(window).scrollTop() - hi;
  //       $('html,body').stop().animate({
  //         scrollTop: siz
  //       }, time, function () {
  //         flag = true;
  //       })
  //     }
  //   }

  //   return false;
  // })

  // $(window).resize(function () {
  //   $(window).scrollTop((siz / hi) * $(window).height());
  //   siz = $(window).scrollTop();
  //   hi = $(window).height();
  // }).scroll(function () {
  //   if ($(window).scrollTop() > 0 && flag1) {
  //     flag1 = false;
  //     $('#back').show().hover(function () {
  //       $(this).css({
  //         background: 'none'
  //       })
  //     }, function () {
  //       $(this).css({
  //         background: '#ccc'
  //       })
  //     }).stop().animate({
  //       borderRadius: '50%',
  //       opacity: 1
  //     }, 1000).click(function () {
  //       $('html,body').stop().animate({
  //         scrollTop: 0
  //       }, 1000, function () {
  //         flag1 = true;
  //       })
  //     });
  //   } else {
  //     if ($(window).scrollTop() == 0) {
  //       $('#back').stop().animate({
  //         opacity: 0
  //       }, 500, function () {
  //         flag1 = true;
  //         $('#back').css({
  //           borderRadius: 0
  //         }).hide();
  //       })
  //     }

  //   }
  // })




  /* ===================================
      Side Menu
  ====================================== */
  if ($("#sidemenu_toggle").length) {
    $("#sidemenu_toggle").on("click", function () {
      $(".pushwrap").toggleClass("active");
      $(".side-menu").addClass("side-menu-active"), $("#close_side_menu").fadeIn(700)
    }),
      $("#close_side_menu").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"), $(this).fadeOut(200), $(".pushwrap").removeClass("active")
      }),
      $(".side-nav .navbar-nav .nav-link").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
      }),
      $("#btn_sideNavClose").on("click", function () {
        $(".side-menu").removeClass("side-menu-active"), $("#close_side_menu").fadeOut(200), $(".pushwrap").removeClass("active")
      });
  }


  /* ===================================
       Counter
  ====================================== */


  // $('.count').each(function () {
  //   $(this).appear(function () {
  //     $(this).prop('Counter', 0).animate({
  //       Counter: $(this).text()
  //     }, {
  //       duration: 3000,
  //       easing: 'swing',
  //       step: function (now) {
  //         $(this).text(Math.ceil(now));
  //       }
  //     });
  //   });
  // });

  // $(".progress-bar").each(function () {
  //   $(this).appear(function () {
  //     $(this).animate({ width: $(this).attr("aria-valuenow") + "%" }, 3000)
  //   });
  // });

  /* ===================================
    Mouse parallax 鼠标 视差
   ====================================== */


  // $('.home-banner').mousemove(function (e) {
  //   $('[data-depth]').each(function () {
  //     var depth = $(this).data('depth');
  //     var amountMovedX = (e.pageX * -depth / 4);
  //     var amountMovedY = (e.pageY * -depth / 4);

  //     $(this).css({
  //       'transform': 'translate3d(' + amountMovedX + 'px,' + amountMovedY + 'px, 0)',
  //     });
  //   });
  // });

  /* =====================================
        Parallax
     ====================================== */

  // if ($(window).width() < 780) {
  //   $('.parallax').addClass("parallax-disable");
  // } else {
  //   $('.parallax').removeClass("parallax-disable");

  //   // parallax
  //   $(".parallax").parallaxie({
  //     speed: 0.55,
  //     offset: 0,
  //   });
  // }

  /* ===================================
    Owl Carousel
   ====================================== */

  //Testimonial Slider

  // $('.testimonial-cast').owlCarousel({
  //   loop: true,
  //   smartSpeed: 500,
  //   responsiveClass: true,
  //   nav: false,
  //   dots: false,
  //   autoplay: true,
  //   margin: 0,
  //   autoplayHoverPause: true,
  //   autoplayTimeout: 3000,
  //   responsive: {
  //     0: {
  //       items: 1,
  //       margin: 30,
  //     },
  //     480: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 4,
  //     }
  //   }
  // });

  // $('.list-item-slider').owlCarousel({
  //   items: 4,
  //   autoplay: 1500,
  //   smartSpeed: 1500,
  //   autoplayHoverPause: true,
  //   slideBy: 1,
  //   loop: true,
  //   margin: 0,
  //   dots: false,
  //   nav: false,
  //   responsive: {
  //     1200: {
  //       items: 4,
  //     },
  //     768: {
  //       items: 3,
  //     },
  //     480: {
  //       items: 2,
  //     },
  //     320: {
  //       items: 1,
  //     },
  //   }
  // });


  /*============================================*
          Cube Portfolio
* ============================================*/


  // $('#js-grid-mosaic-flat').cubeportfolio({
  //   filters: '#js-filters-mosaic-flat',
  //   layoutMode: 'mosaic',
  //   sortByDimension: true,
  //   mediaQueries: [{
  //     width: 1500,
  //     cols: 6,
  //   }, {
  //     width: 1100,
  //     cols: 4,
  //   }, {
  //     width: 800,
  //     cols: 3,
  //   }, {
  //     width: 480,
  //     cols: 1,
  //     options: {
  //       gapHorizontal: 15,
  //       gapVertical: 15,
  //     }
  //   }],
  //   defaultFilter: '*',
  //   animationType: 'fadeOutTop',
  //   gapHorizontal: 0,
  //   gapVertical: 0,
  //   gridAdjustment: 'responsive',
  //   caption: 'zoom',

  //   // lightbox
  //   lightboxDelegate: '.cbp-lightbox',
  //   lightboxGallery: true,
  //   lightboxTitleSrc: 'data-title',
  // });

  // //About Us Image Tilt
  // $('.js-tilt').tilt({
  //   maxTilt: 1,
  //   easing: "cubic-bezier(.03,.98,.52,1)",    // Easing on enter/exit.
  // });



  // if ($(".rev-slider").length) {
  //   $("#rev_slider_1_5").show().revolution({
  //     sliderType: "standard",
  //     jsFileLocation: "//localhost/reveditor/revslider/public/assets/js/",
  //     sliderLayout: "fullscreen",
  //     dottedOverlay: "none",
  //     delay: 9000,
  //     navigation: {
  //       keyboardNavigation: "off",
  //       keyboard_direction: "horizontal",
  //       mouseScrollNavigation: "off",
  //       mouseScrollReverse: "default",
  //       onHoverStop: "off",
  //       touch: {
  //         touchenabled: "on",
  //         touchOnDesktop: "on",
  //         swipe_threshold: 75,
  //         swipe_min_touches: 1,
  //         swipe_direction: "horizontal",
  //         drag_block_vertical: false
  //       },

  //     },
  //     responsiveLevels: [1240, 1024, 778, 480],
  //     visibilityLevels: [1240, 1024, 778, 480],
  //     gridwidth: [1140, 1024, 778, 480],
  //     gridheight: [700, 768, 960, 420],
  //     lazyType: "none",
  //     parallax: {
  //       type: "mouse",
  //       origo: "enterpoint",
  //       speed: 400,
  //       speedbg: 0,
  //       speedls: 0,
  //       levels: [2, 3, 5, 10, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
  //       disable_onmobile: "on"
  //     },
  //     shadow: 0,
  //     spinner: "off",
  //     stopLoop: "off",
  //     stopAfterLoops: -1,
  //     stopAtSlide: -1,
  //     shuffle: "off",
  //     autoHeight: "off",
  //     fullScreenAutoWidth: "off",
  //     fullScreenAlignForce: "off",
  //     fullScreenOffsetContainer: "",
  //     fullScreenOffset: "",
  //     disableProgressBar: "on",
  //     hideThumbsOnMobile: "off",
  //     hideSliderAtLimit: 0,
  //     hideCaptionAtLimit: 0,
  //     hideAllCaptionAtLilmit: 0,
  //     debugMode: false,
  //     fallbacks: {
  //       simplifyAll: "off",
  //       nextSlideOnWindowFocus: "off",
  //       disableFocusListener: false,
  //     }
  //   });
  // }


  /* =====================================
             image portfolio
   ====================================== */


  // $('#js-grid-masonry').cubeportfolio({
  //   filters: '#js-filters-full-width',
  //   layoutMode: 'mosaic',
  //   defaultFilter: '*',
  //   animationType: 'slideDelay',
  //   gapHorizontal: 10,
  //   gapVertical: 10,
  //   gridAdjustment: 'responsive',
  //   mediaQueries: [{
  //     width: 1500,
  //     cols: 5,
  //   }, {
  //     width: 1100,
  //     cols: 4,
  //   }, {
  //     width: 800,
  //     cols: 3,
  //   }, {
  //     width: 480,
  //     cols: 2,
  //     options: {
  //       caption: '',
  //     }
  //   }],
  //   caption: 'zoom',
  //   displayType: 'bottomToTop',
  //   displayTypeSpeed: 100,

  //   // lightbox
  //   // lightbox
  //   lightboxDelegate: '.cbp-lightbox',
  //   lightboxGallery: true,
  //   lightboxTitleSrc: 'data-title',
  //   lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
  // });

  /* ===================================
         slick for testimonial
   ====================================== */


  // $('.slick-test').slick({
  //   vertical: true,
  //   verticalSwiping: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  // });
  // $('.next-review-btn').click(function () {
  //   $('.slick-test').slick('slickNext');
  // });
  // $('.prev-review-btn').click(function () {
  //   $('.slick-test').slick('slickPrev');
  // });

  /* =====================================
                  sponsers  carousel
      ====================================== */

  // $('.sponser-tags').owlCarousel({

  //   loop: true,
  //   margin: 20,
  //   slideSpeed: 5000,
  //   slideTransition: 'linear',
  //   nav: false,
  //   dots: false,
  //   autoplay: true,
  //   autoplayTimeout: 10000,
  //   autoplayHoverPause: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     600: {
  //       items: 2
  //     },
  //     1000: {
  //       items: 4
  //     },
  //   }

  // });

  // // blog items
  // var owl6 = $('.owl-blog-item');
  // owl6.owlCarousel({
  //   loop: true,
  //   dots: false,
  //   items: 1,
  //   margin: 0,
  //   nav: true,
  //   navText: ["<i class='fas fa-long-arrow-alt-left'></i>", "<i class='fas fa-long-arrow-alt-right'></i>"]
  // });

});
