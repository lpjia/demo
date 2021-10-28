import todos from "../mocks/todos.ts";
import Todo from "../interfaces/Todo.ts";
import { v4 } from "https://deno.land/std@0.104.0/uuid/mod.ts";

export default {
  /**
   * @description 获取所有 todos
   * @route GET /todos
   */
  getAllTodos: ({ response }: { response: any }) => {
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },

  /**
   * @description 添加一个 todo
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    const val = await body.value;
    let newTodo: Todo = {
      id: v4.generate(),
      todo: val.todo,
      isCompleted: false,
    };
    let data = [newTodo, ...todos];
    response.status = 200;
    response.body = {
      success: true,
      data,
    };
  },
  /**
   * @description 通过 ID 获取 todo
   * @route GET /todos/:id
   */
  getTodoById: (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    response.status = 200;
    response.body = {
      successL: true,
      data: todo,
    };
  },
  /**
   * @description 通过 ID 更新 todo
   * @route PUT /todos/:id
   */
  updateTodoById: async (
    { params, request, response }: {
      params: { id: string };
      request: any;
      response: any;
    },
  ) => {
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    const body = await request.body();
    const updatedData: {
      todo?: string;
      isCompleted?: boolean;
    } = await body.value;
    let newTodos: Todo[] = todos.map((t) =>
      t.id === params.id ? { ...t, ...updatedData } : t
    );
    response.status = 200;
    response.body = {
      success: true,
      data: newTodos,
    };
  },
  /**
   * @description 通过 ID 删除 todo
   * @params DELETE /todos/:id
   */
  deleteTodoById: (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const todo: Todo | undefined = todos.find((t) => t.id === params.id);
    if (!todo) {
      response.status = 404;
      response.body = {
        success: false,
        message: "No todo found",
      };
      return;
    }

    const allTodos = todos.filter((t) => t.id !== params.id);
    response.status = 200;
    response.body = {
      successL: true,
      data: allTodos,
    };
  },
};
