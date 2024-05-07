import { effect, track, trigger } from "./effect.js";
import { TrackOpTypes, TriggerOpTypes } from "./operation.js";

// 参数归一化, 把不同参数个数或情况统一成一种
function normalizeParameter(getterOrOptions) {
  let getter
    , setter
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    setter = () => {
      console.warn('计算属性没有分配 setter')
    }
  }
  else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return { getter, setter }
}

export function computed(getterOrOptions) {
  // 计算属性, 常用到的就是读, 也就是getter
  const { getter, setter } = normalizeParameter(getterOrOptions)
  let val // 之前的值
    , dirty = true // 脏了, 数据库常见, 意思是目前记录的数据已经过时了, 需要清理掉, 将来用一个新的数据来覆盖它

  // 读.value时计算属性才执行, 也就是延迟执行
  const effectFn = effect(getter, {
    lazy: true,
    // 每次派发更新的时候, 转而会去调用 scheduler 调度器方法, 而不会调用 const effectFn 方法
    scheduler(eff) { // eff 就是 effectFn
      dirty = true
      /* // 数据变了, 没必要重新运行, 而是作一个标记
      effectFn() // eff() */
      trigger(obj, TriggerOpTypes.SET, 'value') // 手动建立关联, 把对应起来的函数重新运行
    }
  })

  // 返回一个obj
  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, 'value') // 手动建立关联
      if (dirty) {
        // 目前数据已经脏了, 就重新运行effectFn, 记录新的数据
        val = effectFn()
        dirty = false
      }
      return val
    },
    set value(newValue) {
      setter(newValue)
    }
  }
  return obj
}