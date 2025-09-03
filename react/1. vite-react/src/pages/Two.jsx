import { useState } from 'react'
import MyShareButton from '../components/MyShareButton'

export default function Two() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div>
      <h1>共享数据更新的计数器</h1>
      <MyShareButton count={count} handleClick={handleClick} />
      <MyShareButton count={count} handleClick={handleClick} />
    </div>
  )
}