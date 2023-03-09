const speak = (name) => {
  // 映射
  // 条件是复杂的该这么写, 使用元组
  const map = [
    // 二维元组
    // 内层元组第一项是判断条件, 第二项是条件为true则执行
    [() => name.includes('牛'), () => console.log(name + '哞哞叫')],
    // 写一行容易看错复杂的条件, 还是分两行写
    [
      () => name.endsWith('虎') && name.length <= 3,
      () => console.log(name + '嗷嗷叫')
    ],
    [
      () => name.endsWith('猫') && !name.includes('狗'),
      () => console.log(name + '喵喵叫')
    ]
  ]

  // find找到一个就不往后找了, 符合if else逻辑
  const target = map.find(item => item[0]())
  if (target) {
    target[1]()
  } else {
    console.log('不知道怎么叫')
  }
}

speak('猫狗');