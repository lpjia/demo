// 使用简单, 所以先不分文件写了


console.log(
  /* 随机数 0-1, 但取不到1 */
  Math.random(),

  /* 向下取整 */
  Math.floor(1.8),
  Math.floor(-1.8),

  /* 向上取整 */
  Math.ceil(7.3),
  Math.ceil(-7.3),

  /* 向0取整 */
  parseInt('5.8', 10),
  parseInt('-5.8', 10),
)