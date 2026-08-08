const DISTANCE = 100
const DURATION = 500
const map = new WeakMap()

let ob = new IntersectionObserver((enties) => {
  for (const entry of enties) {
    if (entry.isIntersecting) { // 出现在了视口中
      const animation = map.get(entry.target) // 拿到动画元素的动画obj
      animation && animation.play() // 播放动画
      ob.unobserve(entry.target) // 动画播放后不需要再次播放, 只播放一次
    }
  }
})

// 在视口之下
function isBelowViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top - window.innerHeight > 0;
}

export default {
  mounted(el) {
    if (!isBelowViewport(el)) {
      return;
    }

    // el.animate(关键帧, 配置) 和css动画、过渡写法一样
    const animation = el.animate([
      {
        transform: `translateY(${DISTANCE}px)`,
        opacity: 0.5
      },
      {
        transform: `translateY(0)`,
        opacity: 1
      }
    ], {
      duration: DURATION, // 动画播放的总时长
      ease: 'ease-out', // 动画的时间函数
      fill: 'forwards' // 动画播放结束的状态
    })

    animation.pause() // 动画先暂停
    map.set(el, animation)

    ob.observe(el) // 挂载时, 观察el
  },
  unmounted(el) {
    ob.unobserve(el) // 卸载时, 不观察el
  }
}