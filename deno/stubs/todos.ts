import { v4 } from "https://deno.land/std@0.104.0/uuid/mod.ts";
// interface
import Todo from "../interface/Todo.ts";

let todos: Todo[] = [
  {
    id: v4.generate(),
    todo: "walk dog",
    isCompleted: true,
  },
  {
    id: v4.generate(),
    todo: "eat food",
    isCompleted: true,
  },
];

export default todos;
