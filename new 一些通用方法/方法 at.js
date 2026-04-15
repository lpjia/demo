// 找索引对应的元素

/* arr.at()
at(index: number): T | undefined;
一参是索引, 接受一个整数值
正整数, 搜索顺序是从左到右
负整数, 搜索顺序是从右到左

返回该索引处的元素 */

/* 数字越界的都返回 undefined */

const beasts = ["ant", "bison", "camel", "duck", "bison"];
console.log(
  beasts.at(3) // 返回"duck"
)
console.log(
  beasts.at(-2) // 返回"duck"
)


/* array[array.length - 1]
array.at(-1)
效果一致, 可以一起记
减1和负1 */





/* str.at()
用法差不多 */