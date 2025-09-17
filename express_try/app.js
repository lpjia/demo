const express = require('express')
const cors = require('cors')

const app = express()

const router = require('./router')

app.use(cors())
app.use(express.json()) // json
// app.use(express.urlencoded()) // x-www-form-urlencoded
// app.use(express.text())

app.use('/api', router);

const port = 3000
app.listen(port, () => {
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
})