import { useState } from "react";
import CreateForm from "./CreateForm";
import Todo from "./Todo";

const todosInitial = [
  {
    ctt: '打扫厕所',
    id: Math.random(),
    isCompleted: false,
    isEditing: false
  },
  {
    ctt: '写作业',
    id: Math.random(),
    isCompleted: false,
    isEditing: false
  },
]

export default function TodoWrapper() {
  const [todos, setTodos] = useState(todosInitial)
  const addTodo = (ctt) => {
    setTodos([
      ...todos,
      {
        ctt,
        id: Math.random(),
        isCompleted: false,
        isEditing: false
      }
    ])
  }
  const deleteTodo = (id) => {
    setTodos(
      todos.filter(item => {
        return item.id !== id
      })
    )
  }
  const toggleCompleted = (id) => {
    setTodos(
      todos.map(item => {
        /* if (item.id === id) {
          item.isCompleted = !item.isCompleted
        }
        return item */

        // 正统写法
        return item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      })
    )
  }
  const toggleEditing = (id) => {
    setTodos(
      todos.map(item => {
        /* if (item.id === id) {
          item.isEditing = !item.isEditing
        }
        return item */

        return item.id === id
          ? { ...item, isEditing: !item.isEditing }
          : item
      })
    )
  }
  const updateTodo = (id, ctt) => {
    setTodos(
      todos.map(item => {
        /* if (item.id === id) {
          item.ctt = ctt
          item.isEditing = false
        }
        return item */

        return item.id === id
          ? { ...item, ctt, isEditing: false }
          : item
      })
    )
  }

  return (
    <div className="wrapper">
      <h1>代办事项</h1>
      <CreateForm addTodo={addTodo}></CreateForm>
      {todos.map(todo => {
        return (
          <Todo key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleCompleted}
            toggleEditing={toggleEditing}
            updateTodo={updateTodo}
          />
        )
      })}
    </div>
  )
}