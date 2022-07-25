import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局路由前缀
  app.setGlobalPrefix('api')

  // 注册验证管道
  app.useGlobalPipes(new ValidationPipe())

  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor())

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 设置 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('后台')
    .setDescription('管理后台接口文档')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)


  const port = 8100
  await app.listen(port);
  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
}
bootstrap();
