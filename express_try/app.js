const express = require('express')
// const cors = require('cors')

const app = express()

const router = require('./router')


// /* express原生配置跨域和自动带cookie */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTION')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Max-Age', 0) // 3600 * 24 = 86400
//   next()
// })

/* const cookieParser = require('cookie-parser')
app.use(cookieParser()) */

// app.use(cors())
app.use(express.json()) // json
// app.use(express.urlencoded()) // x-www-form-urlencoded
// app.use(express.text())

app.use('/api', router);

const port = 3000
app.listen(port, () => {
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
})