/* vue-cli 按需引入 lodash
import _get from 'lodash/get' */

/* https://www.lodashjs.com/docs/lodash.get */


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
  _.get(obj, 'numSum不存在key', 0),
  _.get(obj, 'item[1].cityName')
)
console.log('---- 分割线 ----\n\n\n')