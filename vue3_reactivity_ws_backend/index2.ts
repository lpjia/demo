import WebSocket from "ws"
import { ref, computed, watch } from '@vue/reactivity'

const wss1 = new WebSocket.Server({ port: 8001 })
const wss2 = new WebSocket.Server({ port: 8002 })
const wss3 = new WebSocket.Server({ port: 8003 })

const count = ref(0)
const sum = computed(() => count.value * 10)

// 连接1
wss1.on('connection', (ws) => {
  // 处理来自客户端的消息
  ws.on('message', (message) => {
    count.value = Number(message.toString('utf-8'))
    console.log(count.value)
  })

  // 监听count, 通知连接1的页面
  watch(count, (v) => {
    ws.send(v)
  })
})

// 连接2
wss2.on('connection', (ws) => {
  // 处理来自客户端的消息
  ws.on('message', (message) => {
    console.log(message.toString('utf-8'))
    count.value = 0
  })

  // 监听sum, 通知连接2的页面
  watch(sum, (v) => {
    ws.send(v)
  })

  // 模拟定时任务
  setInterval(() => {
    ws.send(sum.value)
  }, 1000 * 5)
})


wss3.on('connection', (ws) => {
  // 处理来自客户端的消息
  ws.on('message', (message) => {
    console.log(message.toString('utf-8'))
    count.value = 0
  })

  // 监听sum, 通知连接3的页面
  watch(sum, (v) => {
    ws.send(v)
  })

  // 模拟定时任务
  setInterval(() => {
    ws.send(sum.value)
  }, 1000 * 5)
})