{
  const a = 'akkKJDGFAGALGJH'
  console.log(
    a.match(/G/g)  // ['G', 'G', 'G']
  )
  /* /g 全局搜索, 可以匹配多次 */
}


{
  const c = 'https://cli.vuejs.org/zh/guide/installation.html'
  console.log(
    c.match(/(?<=\/)[^\/]*\.[^\/]*$/g) // ["installation.html"]
  )
}


{
  // 转成 '10,000,000' 美式表示
  const str = '100000000000'
  console.log(
    str.replace(/(?=\B(\d{3})+$)/g, ',')
  )
  /* 搜文件"数字格式化" */
}

{
  const className = '1m-10'
  console.log(
    className.match(/^m-(\d+)$/g)
  )
  /* ^ 匹配以什么开头
  $ 匹配以什么结尾
  \d 匹配一位数字, 等同于[0-9]
  + 匹配多次 */
}