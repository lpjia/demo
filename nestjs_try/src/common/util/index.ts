import dayjs from 'dayjs';

export function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}

/* typeof 返回 'object'
区分不开的有 null {} [] 这三种 */

export function convertDate(data: unknown) {
  if (Array.isArray(data)) {
    // 数组 [], 递归处理数组项
    return data.map(convertDate);
  } else if (isObject(data)) {
    // 对象 {}, 遍历key
    return Object.keys(data).reduce((result, key) => {
      let value = data[key];

      // 针对 createTime、updateTime 字段做本地化
      if (['createTime', 'updateTime'].includes(key) && value) {
        value = dayjs(value).format('YYYY-MM-DD HH:mm');
      } else {
        value = convertDate(value);
      }
      result[key] = value;
      return result;
    }, {});
  }
  return data; // 然后其他数据类型直接返回
}

export const today = dayjs().format('YYYY-MM-DD');

/* 判断4种空, null undefined '' NaN, 实体到sql, 不让typeorm转换后报错 parseInt('') → NaN
false 0 被认定为有效值, 不处理 */
export function isEmptyFour(v: unknown) {
  return v === null || v === undefined || v === '' || Number.isNaN(v);
}
/* 判断3种空, null undefined NaN
false 0 '' 不处理 */
export function isEmptyThree(v: unknown) {
  return v === null || v === undefined || Number.isNaN(v);
}
