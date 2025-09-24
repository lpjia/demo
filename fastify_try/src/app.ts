import fastify from 'fastify';
import { userRoutes } from './router';
import { registerResponseHooks } from './hook/responseHandler';

const app = fastify({ logger: true });

// 注册响应处理钩子
registerResponseHooks(app);

// 注册路由模块
app.register(userRoutes, { prefix: '/api' });

// 启动服务器
const start = async () => {
  const port = 3000
  try {
    await app.listen({ port });
    console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
