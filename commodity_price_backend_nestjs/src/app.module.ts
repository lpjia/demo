import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import envConfig from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        /* entities: [PostsEntity],  // 数据表实体, 手动一个个导入, 麻烦 */
        // get()方法还接受一个可选的第二个参数，该参数定义一个默认值，当键不存在时将返回该值
        host: configService.get('DB_HOST'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT'), // 端口号
        username: configService.get('DB_USER'),   // 用户名
        password: configService.get('DB_PAWD'), // 密码
        database: configService.get('DB_NAME'), // 数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: false, // 根据实体自动创建数据库表, 生产环境建议关闭, 实体的任何改动都会影响数据库的列以及数据
        autoLoadEntities: true, // 自动加载实体, 避免手动一个个导入
      })
    }),
    // 下面 module 的顺序和 controller 的顺序可以影响 swagger 接口(按组)的顺序
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
