const speak = (name) => {
  // 常见 if else
  if (name === '老牛') {
    console.log('老牛哞哞叫');
  } else if (name === '老虎') {
    console.log('老虎嗷嗷叫');
  } else if (name === '小猫') {
    console.log('小猫喵喵叫');
  } else {
    console.log('不知道怎么叫')
  }
}

speak('老牛');