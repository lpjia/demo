$(function () {
  const dom_window = $(window)

  // let lazyImgs = $('img[data-src]')
  // 比上面的优势就是遍历时, 不用每次把 dom 封装成 jQ 对象, 一次封装好
  let lazyImgs = _.map($('img[data-src]'), function (item) {
    return $(item)
  })


  function lp_scroll() {
    // 获取页面滚动的高度
    let window_top = dom_window.scrollTop()

    // 判断是否还有未加载的img
    if (lazyImgs.length > 0) {
      // 获取可视区域高度
      let window_height = dom_window.height()

      // 存放待删除的索引
      let loadedIdxArr = []

      // 遍历 img
      _.forEach(lazyImgs, function ($i, idx) {
        // 判断是否在可视范围内
        if ($i.offset().top - window_top < window_height) {
          // 设置src属性
          $i.attr('src', $i.attr('data-src'))
          // 添加到待删除数组
          loadedIdxArr.unshift(idx)
        }
      })

      // 删除已处理的对象
      _.forEach(loadedIdxArr, function (itemIdx) {
        lazyImgs.splice(itemIdx, 1)
      })

    }
  }

  // 绑定事件
  dom_window.scroll(lp_scroll)

  // 手动触发一次
  lp_scroll()
})