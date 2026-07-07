// console.log(process.env.NODE_ENV) // undefined
// console.log(process.env.VITE_API_BASE_URL) // undefined
// console.log(process.env.VUE_APP_BASE_API) // undefined




/* 安装 dotenv 默认读取 .env 文件, 把环境变量注入到 process.env */
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.NODE_ENV) // undefined
console.log(process.env.VITE_API_BASE_URL) // xxx
console.log(process.env.VUE_APP_BASE_API) // yyy
/* cross-env NODE_ENV=development node src/index，命令中有cross-env NODE_ENV=development，把NODE_ENV值注入到 process.env.NODE_ENV */