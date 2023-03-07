/* 语言层面的 */

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

console.log(
  // 深拷贝
  R.clone(obj)
)
console.log(
  _.cloneDeep(obj)
)
obj.item = null
console.log(obj)