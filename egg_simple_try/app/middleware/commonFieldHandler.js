const { maskPhoneNumber } = require("../utils");
const { toRealVal } = require("../utils/enum");

/* 需要处理不同情况, 还要高扩展性 */
/* 一些想法
怎么好扩展呢? 不同的字段值可能需要不同的处理, 可以通过请求路径和方法来区分需不需要处理 */
const keyObj = {
  mobile: (val) => maskPhoneNumber(val),
  gender: (val) => toRealVal('gender', val),
  status: (val) => toRealVal('status', val),
  password: (val, obj) => {
    delete obj.password
  },
}

function convertToDisplayVal(obj) {
  // 如果是数组，则递归转换数组中的每个元素
  if (Array.isArray(obj)) {
    return obj.map(item => convertToDisplayVal(item));
  }

  // 如果是对象，则递归转换对象中的每个属性
  if (typeof obj === 'object' && obj !== null) {
    /* 遍历obj拿到所有key
    从keyObj取需要处理的key
    存在则替换值, 不存在就跳过 */
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (keyObj[key]) {
          obj[key] = keyObj[key](obj[key], obj)
        }
        else {
          obj[key] = convertToDisplayVal(obj[key]);
        }
      }
    }
    return obj;
  }

  // 如果是其他类型，则直接返回
  return obj;
}

module.exports = (options, app) => {
  return async function commonFieldHandlerMiddleware(ctx, next) {
    await next();

    // 如果响应中包含数据
    if (ctx.body && ctx.body.data) {
      /* 接收body的数据, 处理后然后传到下一个中间件 */
      ctx.middlewareData = convertToDisplayVal(ctx.body)
    }
  }
}