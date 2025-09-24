import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// 定义请求参数类型（可选，用于 TypeScript 类型校验）
interface UserParams {
  id: string;
}

interface CreateUserBody {
  name: string;
  email: string;
}

// 路由配置函数，接收 Fastify 实例
export async function userRoutes(fastify: FastifyInstance) {
  // GET /users - 获取所有用户
  fastify.get(
    '/users',
    async (request: FastifyRequest, reply: FastifyReply) => {
      // reply.code(222)
      //   .send({ hello: 'world' })

      return { message: 'List of all users' };
    }
  );

  // GET /users/:id - 获取单个用户
  fastify.get<{ Params: UserParams }>(
    '/users/:id',
    async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
      const { id } = request.params;
      return { message: `Get user with ID: ${id}` };
    }
  );

  // POST /users - 创建用户
  fastify.post<{ Body: CreateUserBody }>(
    '/users',
    async (request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) => {
      const { name, email } = request.body;
      return { message: `Create user: ${name} (${email})` };
    }
  );
}
