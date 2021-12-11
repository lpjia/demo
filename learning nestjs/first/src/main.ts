import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('api')

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 全局注册拦截器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 设置 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  // 注册验证管道
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8100);
}
bootstrap();
