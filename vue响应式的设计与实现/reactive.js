import { handler } from "./handler.js";
import { isObject } from "./utils.js";

const targetMap = new WeakMap()

export function reactive(target) {
  // 如果不是对象, 直接返回
  if (!isObject(target)) {
    return target
  }
  // 如果已经代理过了, 从缓存中直接返回
  if (targetMap.has(target)) {
    return targetMap.get(target)
  }
  const proxy = new Proxy(target, handler)
  // 缓存起来
  targetMap.set(target, proxy)

  return proxy
}