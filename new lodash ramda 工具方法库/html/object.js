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



/* clone 深拷贝 */
let a = R.clone(obj)
let a2 = _.cloneDeep(obj)
obj.item = null
console.log(obj)
console.log(a)
console.log(a2)
