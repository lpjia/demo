/* 封装一个通用函数
js动画函数 */
function animation(option, onProgress) { // onProgress 处理函数
  /* duration 时长, 毫秒
  from 从哪个数字
  to 变到哪个数字 */
  const { duration, from, to } = option
  const distance = to - from // 变化的距离
  const speed = distance / duration // 变化的速度
  const startTime = Date.now() // 记录开始时间
  let value = from // 记录当前的值, 每隔一小段时间会变化, 这里赋值的起始值
  onProgress(value)

  function _run() {
    const now = Date.now() // 每次调用时的当前时间
    const time = now - startTime // 从起始时间到现在用掉的时间
    // 终止条件, 否则会无限调用_run
    if (time >= duration) {
      value = to // 这里赋值的终值
      onProgress(value)
      return;
    }
    const d = time * speed // 这段时间内运动了多少
    value = from + d // 每次调用后的当前值, 这里赋值的中间变化值
    onProgress(value)
    requestAnimationFrame(_run) // 每隔一小段时间去调用_run, 不断的去修改value
  }

  requestAnimationFrame(_run) // 下一次渲染的时候, 调用_run, 启动动画
  /* requestAnimationFrame() 的回调执行时机是由浏览器控制的，因此你不能确定它何时会被调用，只能确定它会在下一次重绘之前被调用 */
}