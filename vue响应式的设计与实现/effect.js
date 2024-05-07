import { TrackOpTypes, TriggerOpTypes } from "./operation.js";

const targetMap = new WeakMap() // 存数据结构
const ITERATE_KEY = Symbol('iterate') // for-in, 缺失了key, 手动增加一种propMap的key来对应
let activeEffect = void 0 // 存收集的fn
const effectStack = [] // effect的执行栈, 手动保持和函数执行栈的一致
let shouldTrack = true

// 暂停依赖收集
export function pauseTracking() {
  shouldTrack = false
}

// 恢复依赖收集
export function resumeTracking() {
  shouldTrack = true
}

// 让用户来指明针对哪个函数来进行依赖收集
export function effect(fn, options = {}) {
  const { lazy = false } = options // 延迟执行, 扩展功能

  /* activeEffect = fn // fn运行期间, activeEffect一定有值
  fn() // fn运行期间用到了响应式数据, 就会调用track
  activeEffect = null */

  /* 依赖收集, 收集的是fn函数, 但派发更新时依赖关系有可能发生变化, 所以要收集fn的整个运行环境 */

  /* 收集依赖不是直接收集这个函数, 而是收集运行这个函数的整个环境 */
  const effectFn = () => {
    try {
      activeEffect = effectFn // 这里就不能是fn了, 而是其整个运行环境effectFn
      effectStack.push(effectFn) // 当前运行函数入栈
      cleanup(effectFn) // 运行函数fn之前要清空之前的依赖记录, 即.deps
      return fn() // 还是要运行fn, 把结果返回
    } finally {
      /* activeEffect = null */
      effectStack.pop() // 当前运行函数出栈
      activeEffect = effectStack[effectStack.length - 1] // 让activeEffect变量重新指向栈的顶部
    }
  }
  effectFn.deps = [] // 记录一下函数在哪些集合里面, [第一个集合, 第二个集合, 等等]
  effectFn.options = options
  if (!lazy) {
    effectFn()
  }
  return effectFn
}

function cleanup(effectFn) {
  const { deps } = effectFn
  if (!deps.length) {
    return;
  }
  for (const dep of deps) {
    dep.delete(effectFn) // 每个集合里删掉依赖的函数
  }
  deps.length = 0 // 数组也得清空
}

// 依赖收集
export function track(target, type, key) {
  // 不进行依赖收集
  if (!shouldTrack || !activeEffect) {
    return;
  }

  // 建立对应关系, 形成一数据结构
  let propMap = targetMap.get(target)
  // 不存在则创建 propMap
  if (!propMap) {
    propMap = new Map()
    targetMap.set(target, propMap)
  }
  // 如果是迭代的, 把键赋值为 symbol
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY
  }
  let typeMap = propMap.get(key)
  if (!typeMap) {
    typeMap = new Map()
    propMap.set(key, typeMap)
  }
  let depSet = typeMap.get(type)
  if (!depSet) {
    depSet = new Set()
    typeMap.set(type, depSet)
  }
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect)
    activeEffect.deps.push(depSet) // 把集合记录到.deps的数组中, 每个activeEffect函数都有deps属性
  }

  /* // 如何获取fn? 就是用户手动effect调用的fn
  console.log('activeEffect:', activeEffect) */

  /* console.log('targetMap:', targetMap) */

  /* if (type === TrackOpTypes.ITERATE) {
    console.log(`%c【${type}】`, 'color: #f00')
    return;
  }
  console.log(`%c【${type}】:`, 'color: #f00', key) */
}

// 派发更新
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key)
  if (!effectFns) {
    return;
  }
  for (const effectFn of effectFns) {
    // 当触发的是当前正在被收集依赖的函数, 跳过
    // 依赖收集的过程中, 不要触发本函数的执行
    if (effectFn === activeEffect) {
      continue;
    }
    // 当有scheduler时, 由用户自己决定执行什么, 也就是转而会去调用 scheduler 调度器方法
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn) // 把effectFn函数传过去
    } else {
      effectFn();
    }
  }

  /* console.log(`%c【${type}】:`, 'color: #00f', key) */
}

// 辅助函数, target type key传过来, 帮忙找到对应的函数, 然后给你, 你拿去运行就完事了
function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target)
  // 不存在则没有这个对应关系
  if (!propMap) {
    return;
  }
  const keys = [key] // key有可能会包含另外一项, 所以用数组
  // 当新增或删除属性的时候, 会影响到迭代器, keys得加iterate
  if (key === TriggerOpTypes.ADD || key === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY)
  }
  const effectFns = new Set() // 收集的dep集合, 保证不重复
  // 依赖收集的类型和派发更新的类型不一样, 有内在联系
  const triggerTypeObj = {
    // 动态属性
    // 一个派发更新的类型可能对应多个依赖收集的类型
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [
      TrackOpTypes.GET,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
    [TriggerOpTypes.DELETE]: [
      TrackOpTypes.GET,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
  }
  for (const key of keys) {
    const typeMap = propMap.get(key)
    if (!typeMap) {
      continue;
    }
    const trackTypes = triggerTypeObj[type] // 根据操作类型拿到依赖收集的类型的数组
    for (const trackType of trackTypes) {
      // dep是Set, 里面是不重复的项
      const dep = typeMap.get(trackType)
      if (!dep) {
        continue;
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn)
      }
    }
  }
  return effectFns
}