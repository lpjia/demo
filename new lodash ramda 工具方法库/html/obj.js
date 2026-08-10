const obj = {
  "numSum": 13,
  "item": [
    {
      "cityName": "郑州市",
      "count": 6
    },
    {
      "cityName": "新乡市",
      "count": 16
    },
  ]
}


/* R.path
获取k的值, 用数组代替路径字符串
和 _.get() 功能一样 */
console.log(
  R.path(['item', 0, 'cityName'], obj)
)
/* R.pathOr
带默认值 */
console.log(
  R.pathOr('----111----', ['item', 100], obj)
)


/* _.get() */
console.log(
  _.get(obj, 'item[1].cityName')
)
console.log(
  _.get(obj, 'numSum不存在key', '----000----')
)
