function convertToCamel(obj) {
  // 如果是数组，则递归转换数组中的每个元素
  if (Array.isArray(obj)) {
    return obj.map(item => convertToCamel(item));
  }

  // 如果是对象，则递归转换对象中的每个属性
  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_(\w)/g, (match, letter) => letter.toUpperCase());
        newObj[newKey] = convertToCamel(obj[key]);
      }
    }
    return newObj;
  }

  // 如果是其他类型，则直接返回
  return obj;
}

module.exports = () => {
  return async function underlineToCamelMiddleware(ctx, next) {
    await next();

    /* // 如果响应中包含数据
    if (ctx.body && ctx.body.data) {
      ctx.body = convertToCamel(ctx.body);
    } */

    // 如果响应中包含数据
    if (ctx.body && ctx.body.data) {
      if (ctx.middlewareData) {
        const { middlewareData } = ctx
        delete ctx.middlewareData
        ctx.body = convertToCamel(middlewareData)
      } else {
        ctx.body = convertToCamel(ctx.body);
      }
    }
  };
};