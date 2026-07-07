// 如果 process.env.NODE_ENV 是 undefined，则手动赋值为 'development'
const env = process.env.NODE_ENV || 'development';

console.log(`当前环境: ${env}`);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)