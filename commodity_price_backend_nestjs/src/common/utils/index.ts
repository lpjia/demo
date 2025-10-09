import dayjs from 'dayjs'

// 下划线转小驼峰
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/* // 日期字段转本地时间
export function convertDates(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => convertDates(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      let value = obj[key];
      // 针对 createTime、updateTime 字段做本地化
      if (["createTime", "updateTime"].includes(key) && value) {
        value = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      }
      result[key] = value;
      return result;
    }, {} as any);
  }
  return obj;
} */


/* 处理返回数据中的某些字段
一般是对象类型, 包括array和object
其他数据类型不处理, JSON也不支持
*/
function dealwithField(obj: any, fns: Function[]): any {
  // Date类型，优先处理
  if (obj instanceof Date) {
    return obj;
  }
  if (Array.isArray(obj)) {
    // 数组类型：递归处理每个元素
    return obj.map(v => dealwithField(v, fns));
  }
  else if (obj !== null && typeof obj === 'object') {
    // 对象类型：递归处理每个属性值，然后应用处理函数
    return Object.keys(obj).reduce((result, key) => {
      // 先递归处理属性值（处理嵌套结构）
      const processedValue = dealwithField(obj[key], fns);
      result[key] = processedValue;
      /* result[toCamelCase(key)] = processedValue; */

      // 应用所有处理函数到当前键值对
      fns.forEach(fn => {
        fn(result, key);
      });

      return result;
    }, {} as any);
  }
  // 非对象/数组类型直接返回
  return obj;
}

function convertDates(obj: any, key: string): void {
  if (["createTime", "updateTime", "deleteTime"].includes(key) && obj[key]) {
    obj[key] = dayjs(obj[key]).format('YYYY-MM-DD HH:mm:ss');
  }
}

function removeDeleteTimeField(obj: any): void {
  if (Object.prototype.hasOwnProperty.call(obj, 'deleteTime')) {
    delete obj.deleteTime;
  }
}

export const dealwithResp = (data: any) => dealwithField(data, [convertDates, removeDeleteTimeField])