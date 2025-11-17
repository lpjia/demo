const fs = require('fs');
const csv = require('csv-parser');
const AuthException = require('../exception/auth');

/* 判断对象 */
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

/* 转int */
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

/* 计算分页的offset */
function calcOffsetByPage(page, pageSize) {
  if (page < 1) page = 1
  return (page - 1) * pageSize
}

/* 键名, 下划线转小驼峰 */
function underlineToCase(str) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}
/* 键名, 小驼峰转下划线 */
function caseToUnderline(str) {
  return str.replace(/([A-Z])/g, function (match, letter) {
    return '_' + letter.toLowerCase();
  });
}
/* 字段名转换 */
function fieldToCase(oldKeyObj, toFn) {
  if (Object.keys(oldKeyObj).length) {
    let obj = {}
    for (const key in oldKeyObj) {
      if (Object.hasOwnProperty.call(oldKeyObj, key)) {
        let newKey = toFn(key)
        obj[newKey] = oldKeyObj[key]
      }
    }
    return obj
  }
}
/* 不需要考虑对象还是数组, 就算是数组, 遍历数组后一样处理 */
/* 下划线转小驼峰 */
function toSmallHump(o) {
  return fieldToCase(o, underlineToCase)
}
/* 小驼峰转下划线 */
function toUnderlineCase(o) {
  return fieldToCase(o, caseToUnderline)
}

/* 解析csv文件数据 */
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
function parseCSV_2(filePath, ctx) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        /* 正确写法 */
        // results.push(data);

        /* 异步调用链里, 如果出现setTimeout等回调, 会跳出异步链, 数据拿不到
        如果出现错误, 也捕获不到, 会出现类似死循环一样的报错信息
        由于拿不到ctx, 所以ctx.runInBackground方法 无法使用 */
        // setTimeout(() => {
        //   results.push(data);
        //   // throw new Error('跳出异步链, 这个错误可以捕获?')
        // }, 500);

        /* 不是这样用的, 纯粹尝试ctx.runInBackground方法 */
        ctx.runInBackground(() => {
          results.push(data);
        })
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

/* 从authorization解析出token */
function getTokenFromAuthorization(ctx) {
  // 获取 Authorization 标头中的 token 字符串
  const authorizationHeader = ctx.request.header.authorization;

  // 检查 token 字符串是否以 Bearer 前缀开头
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new AuthException()
  }

  // 去掉 Bearer 前缀，获取纯净的 token 字符串
  const token = authorizationHeader.substring(7); // 去掉 "Bearer " 前缀的长度

  return token
}

// 脱敏处理函数，这里简单地替换中间四位为 *
function maskPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/* 判断是不是空, 这里空指 null、undefined、NaN、''、[]、{}
0、false当成正常数据
bigint symbol 不需要考虑为空 */
function isEmpty_2(value) {
  // 检查 null 或 undefined
  if (value === null || value === undefined) return true;
  // 检查 NaN
  if (typeof value === 'number' && Number.isNaN(value)) return true;
  // 检查字符串
  if (typeof value === 'string' && value.trim() === '') return true;
  // 检查数组
  if (Array.isArray(value) && value.length === 0) return true;
  // 检查对象
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  // 如果以上条件都不满足，则不为空
  return false;
}
/* 这个写法不常见, 用这个
可以处理复杂条件判断和复杂逻辑处理 */
function isEmpty(value) {
  const map = [
    // 内层元组第一项是判断条件, 第二项是条件为true则执行
    [
      () => value === null || value === undefined,
      () => true
    ],
    [
      () => typeof value === 'number' && Number.isNaN(value),
      () => true
    ],
    [
      () => typeof value === 'string' && value.trim() === '',
      () => true
    ],
    [
      () => Array.isArray(value) && value.length === 0,
      () => true
    ],
    [
      () => typeof value === 'object' && Object.keys(value).length === 0,
      () => true
    ]
  ]

  // find找到一个就不往后找了, 符合if else逻辑
  const target = map.find(item => item[0]())
  return target ? target[1]() : false;
}
function judgeNotEmpty(val) {
  let judgeObj = (p) => {
    if (p === null) return p; // 是null
    else if (Array.isArray(p)) return p.length; // 是数组
    else return !(JSON.stringify(p) === '{}'); // 是对象
  }
  let type = typeof (val)
  switch (type) {
    case 'string': case 'number': case 'boolean': case 'undefined':
      return !!val;
    case 'object':
      return judgeObj(val);
    default:
  }
}


function getRoleLevel(role) {
  /* role -> null或{}或level值为'' */
  if (role?.level) {
    // 先转number, 把前面的0去掉
    let realLevelNum = Number(role.level)
    // 再转string, 比较位数
    let levelStr = String(realLevelNum)
    return levelStr
  }
  return ''
}
/* 得到最大角色等级
参 roles 是个对象数组
返回 -> null或string或role */
function getMaxRoleLevel(roles) {
  // /* 为空数组 */
  // if (roles.length === 0) {
  //   return null
  // }

  /* reduce 方法, 不遍历空数组, 直接返回二参传的初始值 */
  return roles.reduce((max, role) => {
    /* 数组不为空
    考虑没字段, 值为undefined
    有字段没值, 为'' */
    const currentRoleLevelStr = getRoleLevel(role)
    const maxRoleLevelStr = getRoleLevel(max)

    const currLength = currentRoleLevelStr.length
    const maxLength = maxRoleLevelStr.length

    /* 对于都没值, 返回null, 符合currLength < 3 && maxLength < 3
    max无值, curr有值
    max有值, curr无值
    都有值, 用下面的逻辑 */
    // if (currLength === 0 && maxLength === 0) {
    //   return null
    // }    else
    if (maxLength === 0 && currLength !== 0) {
      return role
    }
    else if (currLength === 0 && maxLength !== 0) {
      return max
    }

    /* 对于0001和0002、0011 */
    /* 位数一样且第一位数字一样
    对于0301和0302, 或者1101和1120 */
    if (currLength < 3 && maxLength < 3 || currLength === maxLength && currentRoleLevelStr[0] === maxRoleLevelStr[0]) {
      // 数字越小, 等级越高
      return Number(currentRoleLevelStr) < Number(maxRoleLevelStr) ? role : max
    }
    // if (currLength === maxLength && currentRoleLevelStr[0] === maxRoleLevelStr[0]) {
    //   // 数字越小, 等级越高
    //   return Number(currentRoleLevelStr) < Number(maxRoleLevelStr) ? role : max
    // }
    /* 位数不一样
    对于0601和1522
    还有0002和0304 */
    else if (currLength < 3) {
      return role
    }
    else if (maxLength < 3) {
      return max
    }
    /* 剩下一种, 0204和1201 */
    return '权限不足'

  }, null);
}

module.exports = {
  isObject,
  toInt,
  calcOffsetByPage,
  toSmallHump,
  toUnderlineCase,
  parseCSV,
  getTokenFromAuthorization,
  maskPhoneNumber,
  isEmpty,
  getMaxRoleLevel,
}