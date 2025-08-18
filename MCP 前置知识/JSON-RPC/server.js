import util from './util.js'

process.stdin.on('data', (data) => {
  const req = JSON.parse(data)
  const funcName = req.method
  const params = req.params
  const result = util[funcName](params)
  const res = {
    jsonrpc: '2.0',
    result,
    id: req.id
  }
  process.stdout.write(JSON.stringify(res) + '\n')
})