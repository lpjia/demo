import { MdDelete, MdEdit } from "react-icons/md";
import EditForm from "./EditForm";

export default function Todo({
  todo,
  deleteTodo,
  toggleCompleted,
  toggleEditing,
  updateTodo
}) {

  return (
    todo.isEditing
      ? <EditForm todo={todo} updateTodo={updateTodo} />
      : (
        <div id={todo.id} className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
          <p onClick={() => toggleCompleted(todo.id)}>{todo.ctt}</p>
          <div>
            <MdEdit onClick={() => toggleEditing(todo.id)} style={{ cursor: 'pointer', marginRight: '6px' }} />
            <MdDelete onClick={() => { deleteTodo(todo.id) }} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      )
  )
}