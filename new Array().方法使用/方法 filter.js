// 过滤数组

/* arr.filter()
一参是回调, 二参是this
一参中的回调会被自动传入三个参数：数组元素，元素索引，原数组本身
返回一个新数组 */

/* 一参函数返回 true 表示该元素通过测试，保留该元素，false 则不保留。
不会对空数组进行监测
不会改变原始数组 */

const arr = [0, 1, false, null, '1', 2, undefined, 3, 5, NaN, '', 8]
console.log(
  arr.filter(Boolean)
  // Boolean()将数据转为布尔类型
  // 真值保留, 假值移除
)


// 结合其他高级函数作链式调用
const arr2 = [1, 2, 3, 4]
const arr3 = arr2.filter(item => item > 2).map(it => it * 100)
console.log(arr3)


// 链式调用, 处理多层的复杂数据类型
const response = {
  "sectionDataList": [
    {
      "sectionID": 71831,
      "sensorDataList": [
        {
          "sensorName": "name2",
          "sensorType": 2,
          "sensorType2": null,
          "values": [
            1.0
          ]
        },
        {
          "sensorName": "name12",
          "sensorType": 12,
          "sensorType2": null,
          "values": [
            1.0
          ]
        },
        {
          "sensorName": "name5",
          "sensorType": 5,
          "sensorType2": null,
          "values": [
            1.0
          ]
        }
      ],
      "times": [
        "2021-10-30 16:45:44"
      ]
    }
  ]
}
const arr4 = response.sectionDataList.filter(item => item.sectionID === 71831)[0].sensorDataList.filter(item => {
  const condition = [2, 5, 14]
  return condition.includes(item.sensorType)
})
console.log(arr4)