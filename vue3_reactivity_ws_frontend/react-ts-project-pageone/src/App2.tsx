import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  /* useRef 保存可变值（不触发重新渲染） */
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 副作用逻辑
    socketRef.current = new WebSocket('ws://localhost:8001')
    socketRef.current.addEventListener('message', (e) => {
      console.log(typeof e.data)
      setCount(Number(e.data))
    })

    // 清理函数（可选）
    return () => socketRef.current?.close()
  }, [/* 依赖项数组 */])

  function handleAdd() {
    setCount(() => {
      const newCount = count + 1

      // 发送更新后的 count 到服务器
      socketRef.current?.send(String(newCount))
      return newCount
    })
  }


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
        <button onClick={handleAdd}>点击更新数据</button>
        <p>当前数值: {count}</p>
      </div>

    </>
  )
}

export default App
