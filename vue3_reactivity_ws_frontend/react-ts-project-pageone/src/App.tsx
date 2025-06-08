import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const socket = new WebSocket('ws://localhost:8001')

function App() {
  const [count, setCount] = useState(0)


  /* function add() {
    setCount(count + 1) // setCount是异步的
    // 发送更新后的 count 到服务器
    socket.send(String(count))
  } */

  function add() {
    setCount(() => {
      const newCount = count + 1

      // 发送更新后的 count 到服务器
      socket.send(String(newCount))
      return newCount
    })
  }

  socket.addEventListener('message', (e) => {
    console.log(e.data)
    setCount(e.data)
  })

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div style={{ border: 'solid 2px deepskyblue', borderRadius: '20px' }}>
        <h3>页面1</h3>
        <button onClick={add}>点击更新数据</button>
        <p>当前数值: {count}</p>
      </div>

    </>
  )
}

export default App
