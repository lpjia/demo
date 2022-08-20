
const vm = new Vue({
  el: '#app',
  data() {
    return {
      iconColor: 'var(--diamond-hill)',
      width: '40',
      height: '40',
      activeN: 1,
      activeColor: 'var(--lai-king)',

      arr: [100, 200, 300],
    }
  },
  computed: {
    addId() {
      return n => {
        if (this.arr.includes(n))
          return n
      }
    }
  },
})



// 用 js 来实现
// 据说兼容性不好
function lp_scrollIntoView() {
  // 报错, #300不是有效的选择器
  // const aaa = document.querySelector('#300')

  const a300 = document.getElementById('300')
  a300.scrollIntoView({
    behavior: 'smooth'
  })
}


const page = document.querySelector('.page_body')

// 用兼容性好的, 可是还没平滑效果, 找另一个平滑滚动文件有实现
function lp_scrollTop() {
  const o = document.getElementById('200')
  page.scrollTop = o.offsetTop - 32
}


/* 用了事件委托 */
// $('.page_body').on('scroll', function () {
//   if ($(this).scrollTop() > 50)
//     $('.toTop').fadeIn('slow');
//   else
//     $('.toTop').fadeOut('slow');
// });

$('.page_body').scroll(function () {
  if ($(this).scrollTop() > 50)
    $('.toTop').fadeIn('slow');
  else
    $('.toTop').fadeOut('slow');
});


function toTop() {
  page.scrollTop = 0
}