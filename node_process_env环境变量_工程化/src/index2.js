import dotenv from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenv.config({ path: envFile })

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

console.log('process.env.BASE_API:', process.env.BASE_API)