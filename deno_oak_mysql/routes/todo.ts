import { Router } from "https://deno.land/x/oak@v8.0.0/mod.ts";
import todoController from "../controllers/todo.ts";

const router = new Router();

router
  .get("/", todoController.getAllTodos)
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
