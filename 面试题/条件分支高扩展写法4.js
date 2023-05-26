const speak = (name) => {
  // 映射
  // value可以是不同的操作, 例如函数
  const nameMap = {
    '老牛': () => console.log('老牛哞哞叫'),
    '老虎': () => console.log('写入文件: ', '老虎嗷嗷叫'), // console.log来模拟操作
    '小猫': () => console.log('上传服务器: ', '小猫喵喵叫')
  }

  if (nameMap[name]) {
    nameMap[name]()
  } else {
    console.log('不知道怎么叫')
  }
}

speak('老虎');