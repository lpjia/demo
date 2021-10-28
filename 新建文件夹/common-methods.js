
/**
 * 通过多个人员 id ,找名字,然后多个名字拼成字符串
 * @param #need {object} oSourceAll
 * {
    "1": "赵四",
    "2": "张三"
  }
 * @param #need {array} arr
 * [1,2] / ['1','2']
 * @returns {string}
 * '张三,赵四'
 */
export function idToName(oSourceAll, arr) {
  let sResult = ''
  if (arr.length) {
    for (let item of arr) {
      sResult = sResult.concat(oSourceAll[String(item)], ',')
    }
    sResult = sResult.substring(0, sResult.length - 1)
  }
  return sResult
}
export function getPeopleName(that, id) {
  // debugger
  let curItem = that.selectOptionGroup[1].options.filter((item, idx, arr) => {
    return item.userId.toString() === id.toString()
  })
  // debugger
  if (curItem.length) {
    return curItem[0].staffName
  } else {
    return ''
  }
}


// 上面这个方法, 有时间再研究