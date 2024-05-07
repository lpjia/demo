import { track, trigger } from "./effect.js"
import { TrackOpTypes, TriggerOpTypes } from "./operation.js"
import { hasChanged } from "./utils.js"

export function ref(val) {
  /* 当读取这个value的时候, 进行依赖收集
  当给value赋值的时候, 进行派发更新
  使用访问器 */
  return {
    get value() {
      track(this, TrackOpTypes.GET, 'value')
      return val
    },
    set value(newValue) {
      // 值没变化就不派发更新
      if (!hasChanged(val, newValue)) {
        return;
      }
      val = newValue
      trigger(this, TriggerOpTypes.SET, 'value')
    }
  }
}