import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const socket = new WebSocket('ws://localhost:8002')

function App() {
  const [count, setCount] = useState(0)

  function clear() {
    socket.send('Hello Server')
  }

  /* react的组件重新渲染, 会多次重新注册, 有问题 */
  socket.addEventListener('message', (e) => {
    console.log(typeof e.data)
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
        <h3>页面2</h3>
        <button onClick={clear}>清空数据</button>
        <p>当前数值: {count}</p>
      </div>

    </>
  )
}

export default App
