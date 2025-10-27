import dayjs from "dayjs";

console.log(    
    dayjs.locale() // en
    // typeof dayjs.locale() // string
)





import 'dayjs/locale/zh-cn.js'
dayjs.locale('zh-cn') // 全局使用

console.log(
    // dayjs.locale() // zh-cn
    // dayjs().format() // 2025-10-17T04:31:12+08:00


    dayjs().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss') // 2025-10-17 04:49:55
)