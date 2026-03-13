import { useState } from "react"

export default function EditForm({ todo, updateTodo }) {
  const [ctt, setCtt] = useState(todo.ctt)
  const handleSubmit = (e) => {
    e.preventDefault()
    updateTodo(todo.id, ctt)
  }

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="请输入代办事项"
        value={ctt} onChange={(e) => setCtt(e.target.value)} />
      {/* 这里是原生js的input的处理方式 */}

      <button>完成</button>
    </form>
  )
}