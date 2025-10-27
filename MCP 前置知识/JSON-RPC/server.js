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

// ----分割线----

import utils, { tools } from './util.js'

process.stdin.on('data', (data) => {
  const req = JSON.parse(data)
  let result;

  if (req.method === 'tools/call') {
    result = tools[req.params.name](req.params.arguments)
  }
  else if (req.method in tools) {
    result = utils[req.method](req.params)
  }
  else {
    return;
  }

  const res = {
    jsonrpc: '2.0',
    result,
    id: req.id
  }
  process.stdout.write(JSON.stringify(res) + '\n')
})