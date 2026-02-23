// 定义事件名
const eventNames = ['API:UN_AUTH', 'API:INVALID', 'API:NOT_FOUND']
type EventNames = (typeof eventNames)[number]

class EventEmitter {
  private listeners: Record<string, Set<Function>> = {
    'API:UN_AUTH': new Set(),
    'API:INVALID': new Set(),
    'API:NOT_FOUND': new Set(),
  }

  // 监听
  on(eventName: EventNames, listener: Function) {
    this.listeners[eventName].add(listener)
  }

  // 触发
  emit(eventName: EventNames, ...args: any[]) {
    this.listeners[eventName].forEach((listener) => listener(...args))
  }

  // 事件有优先级

  // 事件可以中断
}

export default new EventEmitter()
/* ES 模块的「单例缓存机制」
在 ES 模块（import/export）规范中，一个模块文件只会被执行一次，执行后的导出结果会被缓存。后续任何地方再次导入该模块时，都会直接复用缓存的导出值，而不会重新执行模块代码、重新创建实例 */