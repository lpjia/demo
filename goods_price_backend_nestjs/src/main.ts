import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

let port = 7100

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);

  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalFilters(new HttpExceptionFilter()) // 注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor()) // 注册全局拦截器
  // 注册全局校验管道
  app.useGlobalPipes(new ValidationPipe())

  // 设置swaggerUI
  const config = new DocumentBuilder()
    .setTitle('后台')
    .setDescription('接口文档')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(port)
  console.log(`[\x1B[36m Running\x1B[0m ] 服务已启动: http://localhost:${port}`);
}
bootstrap();
