import strategy from './strategy.js'

export default class Validator {
  constructor() {
    this.cache = []
  }

  add(dom, rule, errMsg) {
    /**
     * 根据规则拆开 k-v
     * arr 负责存参
     */
    const arr = rule.split(':')

    // 存了几个方法
    this.cache.push(
      () => {
        // 取出来规则(策略)名称
        const strategy2 = arr.shift()
        // 往前加值
        arr.unshift(dom.value)
        // 往后加错误提示
        arr.push(errMsg)
        // 最终把 arr 组装成 strategy 的方法所需要的参

        /**
         * apply 是把参数数组转为参形式再传入方法中
         */
        // return strategy[strategy2].apply(dom, arr)
        return strategy[strategy2].apply(strategy, arr)
        // return strategy[strategy2].apply(null, arr)
      }
    )
  }

  start() {
    for (let i = 0; i < this.cache.length; i++) {
      const msg = this.cache[i](); // 执行方法
      if (msg) return msg;
    }
  }
}