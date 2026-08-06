// 定义事件名
const eventNames = ['API:UN_AUTH', 'API:INVALID', 'API:NOT_FOUND']
type EventNames = (typeof eventNames)[number]

class EventEmitter {
  private listeners: Record<string, { listener: Function; priority: number }[]> = {
    'API:UN_AUTH': [],
    'API:INVALID': [],
    'API:NOT_FOUND': [],
  }

  // 监听
  // priority 可以排优先级, 数字越小越先执行
  on(eventName: EventNames, listener: Function, priority: number = 100) {
    this.listeners[eventName].push({ listener, priority })
  }

  // 触发
  // 回调返回false可中断后续事件触发
  emit(eventName: EventNames, ...args: any[]) {
    const sorted = this.listeners[eventName]
      .slice() // 这里浅拷贝了一份数据来排序, 不影响原有已注册的数据
      .sort((a, b) => a.priority - b.priority)
    for (const item of sorted) {
      const result = item.listener(...args)
      if (result === false) break // 即使break, 也不影响原有已注册的数据
    }
  }
}

export default new EventEmitter()
/* ES 模块的「单例缓存机制」
在 ES 模块（import/export）规范中，一个模块文件只会被执行一次，执行后的导出结果会被缓存。后续任何地方再次导入该模块时，都会直接复用缓存的导出值，而不会重新执行模块代码、重新创建实例 */
