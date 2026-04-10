/* --env-file (Node.js v20.6.0+) 和 --env-file-if-exists (Node.js v22.9.0+) 可以作为命令行标志传递，以从指定的文件中加载环境变量
--env-file 如果文件缺失，则会抛出异常。如果文件可能不存在，请使用 --env-file-if-exists */

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('process.env.FILE_NAME:', process.env.FILE_NAME)
console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);
console.log(process.env.API_KEY);