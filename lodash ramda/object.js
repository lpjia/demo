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



/* 是否为空 */
console.log("R.isNil(undefined):",
  R.isNil(undefined),
  _.isNil(undefined)
)
console.log("R.isNil(null):",
  R.isNil(null),
  _.isNil(null)
)
console.log('---- 分割线 ----\n\n\n')


console.log('R在前 _在后')
console.log("R.isEmpty(false):",
  R.isEmpty(false),
  _.isEmpty(false)
)
console.log("R.isEmpty(''):",
  R.isEmpty(''),
  _.isEmpty('')
)
console.log("R.isEmpty(0):",
  R.isEmpty(0),
  _.isEmpty(0)
)
console.log("R.isEmpty(NaN):",
  R.isEmpty(NaN),
  _.isEmpty(NaN)
)
console.log("R.isEmpty({}):",
  R.isEmpty({}),
  _.isEmpty({})
)
console.log("R.isEmpty([]):",
  R.isEmpty([]),
  _.isEmpty([])
)
