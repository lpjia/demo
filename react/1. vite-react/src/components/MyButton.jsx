import { useState } from 'react'

export default function MyButton() {
  const [count, setCount] = useState(0)

  function handleClick(e) {
    setCount(count + 1)
    console.log(e, 111) // react 事件对象
  }

  return (
    <button className='marginTopBottom' onClick={handleClick}>
      点了 {count} 次
    </button>
  )
}