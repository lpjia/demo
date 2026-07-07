// /* 放在文件最顶部！ */
// require('dotenv').config();
// console.log(process.env.PORT);
// console.log(process.env.DATABASE_URL);
// console.log(process.env.API_KEY);
// console.log(process.env.SECRET_KEY);


require('dotenv').config({ path: '.env.development' });
console.log(process.env.FILE_NAME)
