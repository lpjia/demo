$(function () {
  const $win = $(window)

  // let lazyImgs = $('img[data-src]') // 如果图片较多, 可能每次包装dom会降低性能

  // 遇到电商这种图片比较多的时候, 优势很明显, 其实为了用户体验, 还可以优化, 
  // 不用非等滚动到可视区域才替换加载, 提前一些
  let lazyImgs = _.map($('img[data-src]'), function (item) {
    return $(item)
  })

  // let lazyImgs = [...$('img[data-src]')].map(function (item) {
  //   return $(item)
  // })

  console.log('lazyImgs:', lazyImgs)


  function onScroll() {
    // 获取页面滚动的高度
    let winTop = $win.scrollTop()

    // 判断是否还有未加载的img
    if (lazyImgs.length > 0) {
      // 获取可视区域高度
      let winHeight = $win.height()

      // 存要删除的索引
      let loadedIndexs = []

      // 遍历 img
      _.forEach(lazyImgs, function ($item, i) {
        // 判断是否在可视范围内
        if ($item.offset().top - winTop < winHeight) {
          // 设置src属性
          $item.attr('src', $item.attr('data-src'))
          // 添加到待删除数组
          loadedIndexs.unshift(i)
        }
      })
      console.log('loadedIndexs:', loadedIndexs)

      // 删除已处理的对象
      _.forEach(loadedIndexs, function (i) {
        lazyImgs.splice(i, 1)
        // splice 删除数组项时, 需要遍历索引递减组成的数组, 如[3, 2, 1, 0]
        // 这样才能保证删除是正确的
        // 索引需要用unshift的方式加到数组中
      })

    }
  }

  // 绑定事件
  $win.scroll(onScroll)

  // 手动触发一次
  onScroll()
})