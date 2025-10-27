import dayjs from "dayjs";

import 'dayjs/locale/zh-cn.js'
dayjs.locale('zh-cn') // 全局使用

// console.log(
//   /* 语言 */
//   dayjs.locale(), // zh-cn
//   dayjs().locale('zh-cn').format(), // 2025-06-10T13:55:13+08:00
//   dayjs().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss') // 2025-06-10 13:55:13
// )


// import duration from 'dayjs/plugin/duration.js'
// dayjs.extend(duration)


// console.log(
//   /* 推荐, 不传参(等同于传undefined), 默认当前时间, 传null非法 */
//   dayjs().format('YYYY-MM-DD'), // 2025-06-09
//   dayjs(undefined).format('YYYY-MM-DD'), // 2025-06-09
//   /* 传new Date()也等同于不传 */
//   dayjs(new Date()).format('YYYY-MM-DD'), // 2025-06-09
// )


/* 时间格式化, 常用的就是
YYYY-MM-DD HH:mm:ss 年月日时分秒 */
// console.log(
//   dayjs().format('YYYY-MM-DD'), // 2025-06-09
//   dayjs().format('YYYY-MM-DD HH:mm:ss'), // 2025-06-09 15:32:12
//   dayjs().format('YYYY-MM-DD HH:mm[不被格式化替换]'), // 2025-06-09 15:32不被格式化替换
//   dayjs().format(), // 2025-06-09T15:32:12+08:00
//   /* 处理国际时间 */
//   dayjs('2018-04-04T18:00:00.000Z').format('YYYY-MM-DD HH:mm:ss'), // 2018-04-05 02:00:00
//   /* 返回的是 ISO8601 格式字符串 */
//   dayjs().toISOString(), // 2025-06-09T07:32:12.388Z

/* d 表示周几, 0-6, 0是周日 */
// dayjs().format('d'), // 4
// dayjs().format('dd'), // 四
// dayjs().format('ddd'), // 周四
// dayjs().format('dddd'), // 星期四
// )




/* js的Date.now() 返回一个毫秒的时间戳, 推荐使用
new Date(x) 传参如果传时间戳, 也是要毫秒的
new Date().getTime() 返回的也是一个毫秒的时间戳

dayjs(x) 传参如果传时间戳, 也是要毫秒的
和内置Date对象一样, string类型的时间戳, 解析会出问题, 一概用number类型的时间戳
占位 */

// const timestampStr = '1750089599000' // 毫秒
// console.log(
//   dayjs(timestampStr).format('YYYY-MM-DD HH:mm:ss'), // 1750-11-07 03:00:00 有问题
//   dayjs(Number(timestampStr)).format('YYYY-MM-DD HH:mm:ss'), // 2025-06-16 23:59:59
// )




// console.log(
/* 返回指定单位下两个日期时间之间的差
顺着时间轴方向(往前进方向 ↑, 往后↓)
diff左边日期 > 右边日期 ↑, 返回的是正数 */

/* 默认返回毫秒 */
// dayjs('2020-01-02').diff('2008-08-08'), // 359769600000
// dayjs().diff('2028-08-08'), // -99580133455

/* 不传第三参, 返回整数, 直接截去小数那部分, 相当于向0取整
第三个参传true, 保留小数 */
// dayjs().diff('2008-08-08', 'year'), // 16
// dayjs('2008-08-08').diff(dayjs(), 'year', true), // -16.845302562910693 推荐, 对人友好
// dayjs('2008-08-08').diff(undefined, 'y', true), // -16.845302562941807 不推荐, 不够明确
// )




// import relativeTime from 'dayjs/plugin/relativeTime'; // npm导入
/* 以下三种是pnpm导入方式, 都导入成功, 推荐第一种 */
import relativeTime from 'dayjs/plugin/relativeTime.js'; // pnpm导入, 与npm的区别是得加后缀.js, 否则报错
// import relativeTime from './node_modules/dayjs/plugin/relativeTime.js'; // pnpm导入
// import relativeTime from './node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/relativeTime.js'; // pnpm导入
dayjs.extend(relativeTime)

// console.log(
/* 粗略显示相对时间而已, 需要精确计算的用diff()
传true表示去掉后缀, 比如2年前, 去掉"前" */
// dayjs().fromNow(), // 几秒前
// dayjs().fromNow(true), // 几秒

/* 返回现在到目标时刻的相对时间 */
// dayjs('2023-11-18 10:20').fromNow(), // 2 年前
// dayjs('2023-11-18 10:20').fromNow(true), // 2 年
// dayjs('2033-11-18 10:20').fromNow(), // 8 年内


/* A from B, from 从...来, 不用纠结谁↑, 只是个粗略显示 */
// dayjs('2023-11-18 10:20').from('2008-08-08'), // 15 年内

/* A to B, to 到...去 */
// dayjs('2023-11-18 10:20').to('2008-08-08'), // 15 年前
// )


console.log(
  // dayjs().add(8, 'h').format('YYYY-MM-DD HH:mm:ss'), // 2025-06-12 19:09:26
  // dayjs('2023-01-01').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'), // 2023-01-02 00:00:00
  // dayjs('2023-01-01').add(1, 'w').format('YYYY-MM-DD HH:mm:ss'), // 2023-01-08 00:00:00

  // dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss') // 2025-01-01 00:00:00

  /* 当天的最后时刻 */
  // dayjs().endOf('d').format('YYYY-MM-DD HH:mm:ss') // 2025-06-12 23:59:59

  /* 当月的最后一天 */
  // dayjs().endOf('M').format('YYYY-MM-DD HH:mm:ss') // 2025-06-30 23:59:59

  /* 链式操作 */
  dayjs().endOf('M').startOf('d').format('YYYY-MM-DD HH:mm:ss') // 2025-06-30 00:00:00

)



// ----分割线----




// import dayjs from "dayjs";

// // import relativeTime from 'dayjs/plugin/relativeTime'; // npm导入
// import relativeTime from 'dayjs/plugin/relativeTime.js'; // pnpm导入, 与npm的区别是得加后缀.js, 否则报错
// // import relativeTime from './node_modules/dayjs/plugin/relativeTime.js'; // pnpm导入
// // import relativeTime from './node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/plugin/relativeTime.js'; // pnpm导入
// dayjs.extend(relativeTime)

// import duration from 'dayjs/plugin/duration.js'
// dayjs.extend(duration)

// import 'dayjs/locale/zh-cn.js'
// dayjs.locale('zh-cn') // 全局使用

console.log(
  /* 创建并返回一个当前实例 */
  // dayjs(), // 不传参(等同于传undefined), 默认当前时间, 传null非法
  // dayjs(undefined),
  // dayjs('2008-08-08'),


  /* 时间格式化 */
  // dayjs().format('YYYY-MM-DD'),
  // dayjs().format('YYYY-MM-DD HH:mm:ss'),
  // dayjs().format('YYYY-MM-DD HH:mm[不被格式化替换]'),
  // dayjs().format(),
  // dayjs('2018-04-04T18:00:00.000Z').format('YYYY-MM-DD HH:mm:ss'), // 处理国际时间
  // dayjs().toISOString(), // 返回的是 ISO8601 格式字符串


  /* 语言 */
  // dayjs.locale(),
  // dayjs().locale('zh-cn').format(), // 当前实例使用


  // dayjs('2023-11-18 10:20').fromNow(), // 返回现在到当前实例的相对时间
  // dayjs().from('2008-08-08', true), // 返回 X 到当前实例的相对时间
  // dayjs('2008-08-08').toNow(), // 返回当前实例到现在的相对时间


  // dayjs().add(8, 'h').format(),


  /* 多行的空出一行, 方便注释 */
  /* 返回指定单位下两个日期时间之间的差
  顺着时间轴方向(往前↑ 往后↓)
  diff左边日期比右边日期大↑, 返回的是正数 */

  // dayjs().diff('2008-08-08'), // 默认返回毫秒
  // dayjs('2008-08-08').diff(undefined, 'y', true),
  // dayjs('2008-08-08').diff(undefined, 'y'),
  // dayjs().diff('2008-08-08', 'year'), // 返回整数, 直接截去小数那部分, 相当于向0取整
  // dayjs().diff('2008-08-08', 'year', true), // 三参传true, 保留小数


  // dayjs('2023-01-01').add(1, 'day'), // 返回的是Dayjs对象, 得格式化后才能用
  // dayjs('2023-01-01').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
)



/* ----以上为之前的----
// 2025-06-09 02:38 星期一 */


/* js的Date.now() 返回一个毫秒的时间戳, 推荐使用
new Date(x) 传参如果传时间戳, 也是要毫秒的
new Date().getTime() 返回的也是一个毫秒的时间戳

dayjs(x) 传参如果传时间戳, 也是要毫秒的
和内置Date对象一样, string类型的时间戳, 解析会出问题, 一概用number类型的时间戳
占位 */
const timestampStr = '1750089599000' // 毫秒
console.log(
  dayjs(timestampStr).format('YYYY-MM-DD HH:mm:ss'), // 1750-11-07 03:00:00
  dayjs(Number(timestampStr)).format('YYYY-MM-DD HH:mm:ss'), // 2025-06-16 23:59:59

  dayjs().format('YYYY-MM-DD HH:mm:ss'),
)


/* Day.js 将 dayjs(null) 视为无效的输入。
dayjs() 等同于 dayjs(new Date()) 的调用 */