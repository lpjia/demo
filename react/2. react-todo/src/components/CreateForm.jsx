import { useState } from "react"

export default function CreateForm({ addTodo }) {
  const [ctt, setCtt] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(ctt)
    setCtt('') // 清空输入框
  }

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="请输入代办事项"
        value={ctt} onChange={(e) => setCtt(e.target.value)} />
      {/* 这里是原生js的input的处理方式 */}

      <button>加入</button>
    </form>
  )
}