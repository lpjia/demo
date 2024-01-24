const mqtt = require('mqtt')

const host = 'broker-cn.emqx.io'
const port = '1883'
/* 每个客户端的 clientId 都要不一样, 否则冲突 */
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const clientId = 'mqttx_32efeb46'
const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

const topic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log(
    'Received Message:',
    `[\x1B[36mtopic\x1B[0m] ${topic}`,
    `[\x1B[36mpayload\x1B[0m] ${payload.toString()}`
  )
})