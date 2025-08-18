import { spawn } from 'child_process';

const serverProcess = spawn('node', ['server.js'])

serverProcess.stdout.on('data', (data) => {
  console.log(data.toString())
})

const msgArr = ['生命有意义吗?', '宇宙有尽头吗?', '再见!']

msgArr.forEach((msg, i) => {
  setTimeout(() => {
    console.log(`----> ${msg}`)
    serverProcess.stdin.write(msg)
  }, i * 1000)
})