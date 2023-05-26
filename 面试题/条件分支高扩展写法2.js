const speak = (name) => {
  // switch case
  switch (name) {
    case '老牛':
      console.log('老牛哞哞叫');
      break;
    case '老虎':
      console.log('老虎嗷嗷叫');
      break;
    case '小猫':
      console.log('小猫喵喵叫');
      break;
    default:
      console.log('不知道怎么叫')
      break;
  }
}

speak('老虎');