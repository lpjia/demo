/* 使用生成器与迭代器 */

function* walk(str) {
  let part = ''
  let terminals = ['.', '-']
  for (let i = 0; i < str.length; i++) {
    if (terminals.includes(str[i])) {
      // 终结符
      yield part
      part = ''
    }
    else {
      part += str[i]
    }
  }
  // 处理最后一个字符
  if (part) {
    yield part
  }
}

function compare(a, b) {
  return a.localeCompare(b);
}

// // 一比二 字符长度短 能比较出大小 ok
// const iterator = walk('12.9.21')
// const iterator2 = walk('12.9.20-alpha.3')

// // 一比二 字符长度短 不能比较出大小 ok
// const iterator = walk('12.9.20')
// const iterator2 = walk('12.9.20-alpha.3')

// // 一二 字符一样长 不能比较出大小 ok
// const iterator = walk('12.9.20-alpha.3')
// const iterator2 = walk('12.9.20-alpha.3')

// // 一二 字符一样长 ok
// const iterator = walk('12.9.20-alpha.3')
// const iterator2 = walk('12.9.20-beta.1')

// 一比二 字符长度长
const iterator = walk('12.9.20-alpha.3')
const iterator2 = walk('12.9.20')



function logLatestVersion(iterator, iterator2) {
  // 迭代器可以用for...of直接遍历
  for (const item of iterator) {
    // console.log(item)
    const another = iterator2.next()
    if (another.done) {
      console.log('迭代器1版本号最新')
      return;
    }
    // console.log('another:', another)
    if (compare(item, another.value) > 0) {
      console.log('迭代器1版本号最新')
      // break
      return;
    }
    else if (compare(item, another.value) < 0) {
      console.log('迭代器2版本号最新')
      // break
      return;
    }
  }

  if (iterator2.next().done) {
    console.log('两个版本号一样')
  }
  else {
    console.log('迭代器2版本号最新')
  }
}

// 打印出最新的版本号
logLatestVersion(iterator, iterator2)