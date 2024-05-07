import { pauseTracking, resumeTracking, track, trigger } from "./effect.js"
import { TrackOpTypes, TriggerOpTypes } from "./operation.js"
import { reactive } from "./reactive.js"
import { hasChanged, isObject } from "./utils.js"

const keys = ['includes', 'indexOf', 'lastIndexOf']
/* 想要组装成这样的数据对象
arrayInstrumentation = {
  includes: () => {},
  indexOf: () => {},
  lastIndexOf: () => {},
} */
const arrayInstrumentation = {} // Instrumentation是仪表盘的意思
const RAW = Symbol('raw')
keys.forEach((key) => {
  // 方法重写, 覆盖原方法
  arrayInstrumentation[key] = function (...args) {
    // this 指向 proxy, 也就是代理对象
    // 1. 正常找
    // console.log('this:', this)
    const result = Array.prototype[key].apply(this, args)
    // 2. 找不到, 从原始对象中重新找一遍
    if (result < 0 || result === false) {
      return Array.prototype[key].apply(this[RAW], args)
    }
    return result
  }
})

// 能够修改数组的方法 键
const keysOfModifyArray = ['push', 'pop', 'shift', 'unshift', 'splice']
keysOfModifyArray.forEach((key) => {
  arrayInstrumentation[key] = function (...args) {
    pauseTracking() // 暂停依赖收集
    const result = Array.prototype[key].apply(this, args)
    resumeTracking() // 恢复依赖收集
    return result
  }
})

function get(target, key, receiver) {
  // 获取原始对象
  if (key === RAW) {
    return target
  }
  track(target, TrackOpTypes.GET, key) // 依赖收集
  // 数组的一些方法, 需要重写, 来处理边界情况
  if (Object.prototype.hasOwnProperty.call(arrayInstrumentation, key) && Array.isArray(target)) {
    // 改动后的方法
    return arrayInstrumentation[key]
  }
  const result = Reflect.get(target, key, receiver) // 读
  if (isObject(result)) {
    return reactive(result) // 类似递归, proxy只能拦截一层
  }
  return result
}

function set(target, key, value, receiver) {
  // 区分改属性还是新增属性
  const type = Object.prototype.hasOwnProperty.call(target, key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  // 找到旧值, 用来对比新值
  const oldValue = target[key]
  const oldLen = Array.isArray(target) ? target.length : void 0;
  const result = Reflect.set(target, key, value, receiver)
  // 赋值没成功, 对于只读的属性或冻结的对象
  if (!result) {
    return result
  }
  const newLen = Array.isArray(target) ? target.length : void 0;
  // 值有变化或新增属性, 才派发更新
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key) // 派发更新
    // 数组的长度发生变化
    if (Array.isArray(target) && oldLen !== newLen) {
      // 数组的下标赋值, 只能改项或数组变长 state[15] = 3
      if (key !== 'length') {
        trigger(target, TriggerOpTypes.SET, 'length') // 派发更新
      }
      else {
        // 找到那些被删除的下标, 依次触发派发更新
        // 数组变长 state.length = 10, 不进入循环
        // 数组变短 state.length = 3
        for (let i = newLen; i < oldLen; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
      }
    }
  }
  return result
}

function deleteProperty(target, key) {
  // 先判断要删除的属性有没有? 同时判断是不是删除成功?
  const hadKey = Object.prototype.hasOwnProperty.call(target, key)
  const result = Reflect.deleteProperty(target, key) // 删除对象的相应属性
  if (hadKey && result) {
    trigger(target, TriggerOpTypes.DELETE, key) // 派发更新
  }
  return result
}

function has(target, key) {
  track(target, TrackOpTypes.HAS, key) // 依赖收集
  return Reflect.has(target, key) // 判断对象是否有相应属性值
}

function ownKeys(target) {
  track(target, TrackOpTypes.ITERATE) // 依赖收集
  return Reflect.ownKeys(target) // 返回对象的所有属性名
}

export const handler = {
  get,
  set,
  has,
  ownKeys,
  deleteProperty,
}