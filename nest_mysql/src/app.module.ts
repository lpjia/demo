import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import envConfig from './util/env'

@Module({
  // 就只能用这种方式来连接数据库
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
        // entities: [PostEntity],  // 数据表实体
        // get()方法还接受一个可选的第二个参数，该参数定义一个默认值，当键不存在时将返回该值
        // get() 其实是 get<string>()
        host: configService.get('DB_HOST'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT'), // 端口号
        username: configService.get('DB_USER'),   // 用户名
        password: configService.get('DB_PAWD'), // 密码
        database: configService.get('DB_NAME'), //数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: false, // 根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true,
      })
    }),
    // 下面 module 的顺序和 controller 的顺序可以影响 swagger 接口(按组)的顺序
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
