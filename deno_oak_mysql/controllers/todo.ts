// 加载模型操作文件
import TodoModel from "../models/todo.ts";

// 失败时响应
let errRes = (
  { response, message }: {
    response: any;
    message: string;
  },
) => {
  response.status = 400;
  response.body = {
    success: false,
    message,
  };
};

export default {
  /**
   * @description 获取所有 todos
   * @route GET /todos
   */
  getAllTodos: async ({ response }: { response: any }) => {
    try {
      const data = await TodoModel.getAll();
      response.status = 200;
      response.body = {
        success: true,
        data,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      };
    }
  },

  /**
   * @description 添加一个 todo
   * @route POST /todos
   */
  createTodo: async (
    { request, response }: { request: any; response: any },
  ) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }

    const body = await request.body();
    const val = await body.value;

    try {
      await TodoModel.add(
        { todo: val.todo, isCompleted: false },
      );
      response.body = {
        success: true,
        message: "The record was added successfully",
      };
    } catch (error) {
      /*
      response.status = 400;
      response.body = {
        success: false,
        message: `Error: ${error}`,
      }; */
      errRes({ response, message: `Error: ${error}` });
    }
  },

  /**
   * @description 通过 ID 获取 todo
   * @route GET /todos/:id
   */
  getTodoById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const isAvailable = await TodoModel.doesExistById(
        { id: Number(params.id) },
      );

      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      const todo = await TodoModel.getById(
        { id: Number(params.id) },
      );
      response.status = 200;
      response.body = {
        success: true,
        data: todo,
      };
    } catch (error) {
      errRes({ response, message: `Error: ${error}` });
    }
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
    try {
      const isAvailable = await TodoModel.doesExistById(
        { id: Number(params.id) },
      );
      if (!isAvailable) {
        response.status = 404;
        response.body = {
          success: false,
          message: "No todo found",
        };
        return;
      }

      const body = await request.body();
      const val = await body.value;
      const updateRows = await TodoModel.updateById(
        { id: Number(params.id), ...val },
      );
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updateRows} row(s)`,
      };
    } catch (error) {
      errRes({ response, message: `Error: ${error}` });
    }
  },

  /**
   * @description 通过 ID 删除 todo
   * @params DELETE /todos/:id
   */
  deleteTodoById: async (
    { params, response }: { params: { id: string }; response: any },
  ) => {
    try {
      const updateRows = await TodoModel.deleteById(
        { id: Number(params.id) },
      );
      response.status = 200;
      response.body = {
        success: true,
        message: `Successfully updated ${updateRows} row(s)`,
      };
    } catch (error) {
      errRes({ response, message: `Error: ${error}` });
    }
  },
};
