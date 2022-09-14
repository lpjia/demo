import { NestFactory } from '@nestjs/core';
// import config from 'config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api')

  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  const port = 8830
  await app.listen(port);
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
}
bootstrap();
