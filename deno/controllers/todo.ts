import { v4 } from "https://deno.land/std@0.104.0/uuid/mod.ts";
// 接口
import ITodo from "../interface/Todo.ts";
// stubs
import todos from "../stubs/todos.ts";

/**
 * @description 想封装一个错误返回
 */
let errRes: (
  { params, request, response }: {
    params: { id: string };
    request?: any;
    response: any;
  },
) => any = (
  { params, request, response }: {
    params: { id: string };
    request?: any;
    response: any;
  },
) => {
  const todo: ITodo | undefined = todos.find((t) => t.id === params.id);
  if (!todo) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No todo found",
    };
    return;
  }
  return true;
};

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
   * @description 添加一个新 todo
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

    // 如果请求体验证通过, 则返回新增后的所有 todos
    let newTodo: Todo = {
      id: v4.generate(),
      todo: val.todo,
      isCompleted: false,
    };
    let data = [...todos, newTodo];
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

    // 如果 todo 找到了
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  },
  /**
   * @description 通过 ID 更新指定 todo
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
    // errRes({ params, request, response });

    // 如果找到相应 todo 则更新它
    const body = await request.body();
    const updatedData: {
      todo?: string;
      isCompleted?: boolean;
    } = await body.value;
    let newTodos = todos.map((t) =>
      t.id === params.id ? { ...t, ...updatedData } : t
    );
    response.status = 200;
    response.body = {
      success: true,
      data: newTodos,
    };
  },
  /**
   * @description 通过 ID 删除指定 todo
   * @route DELETE /todos/:id
   */
  deleteTodoById: (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    const allTodos = todos.filter((t) => t.id !== params.id);

    // 剩余的 todos
    response.status = 200;
    response.body = {
      success: true,
      data: allTodos,
    };
  },
};
