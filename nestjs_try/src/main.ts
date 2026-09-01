import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

const port = 7101;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  app.useGlobalInterceptors(new TransformInterceptor()); // 注册全局拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局错误的过滤器

  // 注册全局校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true, // 遇到第一个验证错误即停止，不再验证后续规则
      transform: true, // 启用自动类型转换（使 @Transform 装饰器生效）
      transformOptions: {
        enableImplicitConversion: false // 不启用隐式转换，只使用 @Transform 显式转换
      }
    })
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('后台')
    .setDescription('接口文档')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  /* SwaggerModule.setup('docs', app, document) // swaggerUI */

  // scalarUI
  app.use('/docs', apiReference({ content: document }));

  await app.listen(port);

  console.log(`[\x1B[36mRunning\x1B[0m] 服务已启动: http://localhost:${port}`);
}
void bootstrap();
