/* vue-cli 按需引入 lodash
import _get from 'lodash/get' */

// https://www.lodashjs.com/docs/lodash.get

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
const num = _.get(obj, 'numSum2', 0)
console.log(num)

const num2 = _.get(obj, 'item[1].count')
console.log(num2)