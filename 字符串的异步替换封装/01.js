/* 异步函数, 返回一个promise, 需要时间来完成 */
function getName(str) {
  return new Promise((resolve, reject) => {
    // resolve(`name${str}`)

    setTimeout(() => {
      resolve(`name${str}`)
    }, 0);
  })
}


/* 把字符串里面的数字提出来
替换成一个相应的名字
由一个getName异步函数来获取名字
比如1最后替换成name1 */
const template = `15,1,2-3_12--13------5`;


/* getName('15').then(name => {
  console.log(name)
}) */


/* template.replace(/\d+/g, match => {
  console.log(match)
}) */


/* replace方法不会等异步函数的完成, 会立即替换
所以不支持异步 */
/* const result = template.replace(/\d+/g, match => {
  return getName(match)
})
console.log(result) */


/* (async () => {
  const matchs = template.match(/\d+/g)
  console.log('matchs:', matchs)
  const result = matchs.map(getName)
  console.log('result:', result)
})() */


/* (async () => {
  const matchs = template.match(/\d+/g)
  console.log('matchs:', matchs)
  let result = matchs.map(getName)
  result = await Promise.all(result) // 等待完成
  console.log('result:', result)
})() */


/* (async () => {
  const matchs = template.match(/\d+/g)
  console.log('matchs:', matchs)
  let names = matchs.map(getName)
  names = await Promise.all(names) // 等待完成
  let result = template
  for (let i = 0; i < matchs.length; i++) {
    const match = matchs[i];
    const name = names[i]
    // console.log('match:', match)
    // console.log('name:', name)
    result = result.replaceAll(match, name)
    // 替换的结果不是想要的, result: namename1name5,name1,name2-name3_name1name2--name1name3------name5
    // namename1name5因为15被替换成name15, matchs数组里还有1和5
    // 后续1被替换成name1, name15的1也被替换namename15,
    // 后续5被替换成name5, namename15的5也被替换namename1name5
  }
  console.log('names:', names)
  console.log('result:', result)
})() */


(async () => {
  const matchs = template.match(/\d+/g)
  console.log('matchs:', matchs)
  let names = matchs.map(getName)
  names = await Promise.all(names) // 等待完成
  console.log('names:', names)

  // 转换思路, 需求其实就是一个接一个替换, 顺序也没问题
  /* template.replace(/\d+/g, match => {
    console.log('match:', match)
  }) */
  const result = template.replace(/\d+/g, () => names.shift())

  console.log('result:', result)
})()