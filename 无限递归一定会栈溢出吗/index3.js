function fn() {
  Promise.resolve().then(fn) // 立即把fn加入到微队列, 异步
}
fn()