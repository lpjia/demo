import dayjs from "dayjs";

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
  dayjs('2023-01-01').add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
)