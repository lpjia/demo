const speak = (name) => {
  // 映射
  // nameMap 可以提出来单独放到一个文件中, 可以作为配置项, 方便扩展
  const nameMap = {
    '老牛': '老牛哞哞叫',
    '老虎': '老虎嗷嗷叫',
    '小猫': '小猫喵喵叫'
  }

  if (nameMap[name]) {
    console.log(nameMap[name]);
  } else {
    console.log('不知道怎么叫')
  }
}

speak('小猫');