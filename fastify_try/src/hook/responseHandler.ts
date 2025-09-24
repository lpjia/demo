import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const formatSuccessResponse = (payload: any) => {
  return {
    code: 0,
    msg: 'success',
    data: payload || null,
  };
};

const formatErrorResponse = (error: Error, statusCode: number) => {
  return {
    code: statusCode || 500,
    msg: error?.message || '服务器错误',
  };
};

export const registerResponseHooks = (app: FastifyInstance) => {
  // 处理成功响应
  app.addHook('onSend', async (request: FastifyRequest, reply: FastifyReply, payload) => {
    // 错误响应不处理（由 onError 钩子处理）
    if (reply.statusCode >= 400) {
      return payload;
    }

    // 解析原始 payload（可能是字符串或对象）
    let data = payload;
    if (typeof payload === 'string') {
      try {
        data = JSON.parse(payload);
      } catch {
        // 如果解析失败，直接使用原始字符串
        data = payload;
      }
    }

    // 返回格式化后的响应
    return JSON.stringify(formatSuccessResponse(data));
  });

  // 处理错误响应
  app.addHook('onError', async (request: FastifyRequest, reply: FastifyReply, error) => {
    // 避免重复处理
    if (reply.sent) {
      return;
    }

    // 设置默认状态码
    const statusCode = reply.statusCode || 500;
    reply.code(statusCode);

    // 返回格式化后的错误响应
    reply.send(formatErrorResponse(error, statusCode));
  });
};