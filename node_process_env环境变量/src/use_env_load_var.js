const dotenv = require('dotenv');
const path = require('node:path');

// 从 cross-env 传入的环境变量获取当前环境
const env = process.env.NODE_ENV || 'development';

// 拼接 .env 文件路径
const envPath = path.resolve(__dirname, `../.env.${env}`);

// 加载对应环境变量
dotenv.config({ path: envPath });

console.log(process.env.FILE_NAME)