import WebSocket from "ws"

const wss1 = new WebSocket.Server({ port: 8001 })
const wss2 = new WebSocket.Server({ port: 8002 })

let ws1: WebSocket | null = null
let ws2: WebSocket | null = null
let count = 0

// 连接1
wss1.on('connection', (ws) => {
  ws1 = ws
  // 处理来自客户端的消息
  ws.on('message', (message) => {

    // console.log(
    //   typeof message, // 二进制数据 对象类型
    //   message, // 二进制数据
    //   /* 在 Node.js 环境中，使用 String() 转换二进制数据（如 Buffer 对象）时，系统会尝试使用 ‌UTF-8 编码‌将二进制数据解码为字符串 */
    //   Number(String(message)),
    //   Number(message.toString('utf-8')) // 推荐
    // )

    count = Number(message.toString('utf-8'))
    console.log(count)
    // 通知连接2的页面
    if (ws2) {
      ws2.send(count * 10)
    }
  })
})

// 连接2
wss2.on('connection', (ws) => {
  ws2 = ws
  // 处理来自客户端的消息
  ws.on('message', () => {
    count = 0
    ws2?.send(count)
    // 通知连接1的页面
    if (ws1) {
      ws1.send(count)
    }
  })
})


// 模拟定时任务
setInterval(() => {
  ws2?.send(count * 10)
}, 1000 * 5)

/* 当多个WebSocket连接实例增加时，代码可能变得难以管理, 维护起来可能会很麻烦
能否让每个WebSocket连接管理自己的状态？
问题在于，尽管每个连接管理自己的状态，它们仍然需要依赖一个共同的变量（即count）。当某个实例更新了count，另一个实例如何被通知并作出反应呢？
想到这里，我就联想到了 Vue3 的响应式机制。Vue3 提供了一套非常优秀的响应式 API，当数据变化时，它能够自动通知相关的组件进行更新。 */