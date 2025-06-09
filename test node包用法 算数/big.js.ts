/* 解决js内置的number类型数字运算精度丢失

big.js 是一个极简的任意精度库
它不接受 NaN 或 Infinity 作为合法值，也不支持其他进制的数，运行时配置选项仅限于设置除法运算的小数位数和舍入模式，以及 toString 生成指数表示法时的指数值。

https://github.com/MikeMcl/big.js
<script src='https://cdn.jsdelivr.net/npm/big.js@7.0.1/big.min.js'></script>

使用数字、字符串或已有 Big 对象初始化，‌推荐字符串传值避免精度丢失‌
所有运算返回新 Big 对象，需调用 .toString() 或 .toNumber() 获取结果
推荐toString, 反正全程用Big去计算, 得到的字符串数字在页面上也不影响显示

加法  plus
减法  minus
乘法  times
除法  div

=判断 a.eq(b)
<判断 a.lt(b)
>判断 a.gt(b)
<=  lte()
>=  gte()
返回的是布尔类型

Big.DP = 10;   // 默认小数位数 20
Big.RM = 1;    // 舍入模式：1（四舍五入）
四舍五入模式：0（向下）、1（半向上）、2（半偶数）或3（向上）。

绝对值  abs()
n次幂(右上角数字) pow(n)
保留m位小数, 不传则默认保留原数字 toFixed(m)


占位 */
import Big from "big.js";



console.log(
  // 0.1 + 0.2, // 精度丢失
  // Big('0.1').plus('0.2').toNumber(),

  // 0.3 - 0.2,
  // Big('0.3').minus('0.2').toNumber(),

  // Big('0.6').times('0.3').toNumber(),

  // Big('10').div('3').toNumber(), // toNumber可能得到的结果不对
  // Big('10').div('3').toString(),
)


// Big.DP = 17;
// console.log(
//   Big('10').div('3').toNumber(),
//   Big('10').div('3').toString(),
// )


// const a = Big('0.1');
// const b = Big('0.2');
// console.log(
//   a.eq(b), // false
//   typeof a.eq(b), // 'boolean'

//   a.lt('0.3'),
// )


const x = Big('-123.456')
console.log(
  x.abs().toString(),

  Big('-5').pow(3).toString(),

  x.toFixed(1).toString(),
  x.toFixed().toString(),
)