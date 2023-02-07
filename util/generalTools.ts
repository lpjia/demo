/* generalTools 通用工具库 */

// 现成写好的 js 工具库, 写一个声明文件比重写 ts 版本要快得多

// 把对象属性拆分成单独对象, 再push到数组
interface Obj {
  [key: string]: any
}

interface Opti {
  assign?: Object
  exclude?: string[]
}

export function objKeyToOrmField(obj: Obj = {}, options?: Opti) {
  const newArr: object[] = []
    , newObj: Obj = {}
  Object.assign(newObj, obj)

  // 增加对象属性
  if (options?.assign) {
    Object.assign(newObj, options.assign)
  }

  // 排除某些字段
  if (options?.exclude) {
    for (const item of options.exclude) {
      delete newObj[item]
    }
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(newObj, key)) {
      const val = newObj[key];
      newArr.push({ [key]: val })
    }
  }

  return newArr
}