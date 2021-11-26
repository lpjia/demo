
// https://www.lodashjs.com/docs/lodash.get
/**
 * 声明一个方法
 * 声明一个变量
 * 延时1s调用方法模拟正常请求
 */
const resObj = {
  "numSum": 13,
  "item": [
    {
      "cityName": "郑州市",
      "count": 6
    },
  ]
}
let tunnelList = null
function test_get() {
  const dom = document.querySelector('#tunnelNum')
  dom.innerHTML = _.get(tunnelList, 'numSum', 0)

  setTimeout(() => {
    tunnelList = resObj
    dom.innerHTML = _.get(tunnelList, 'numSum', 0)
  }, 1000)
}
test_get()