import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import path from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisCacheModule } from './db/redis-cache.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { KindModule } from './kind/kind.module';
import { TagModule } from './tag/tag.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [envConfig.path]
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'client', 'dist'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: true, // 关闭强制 404
        index: 'index.html', // 首页刷新不丢失（SPA 必需）
      },
    }),
    /* TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PSWD'),
        database: configService.get('DB_NAME'),
        timezone: '+08:00',
        synchronize: false,
        autoLoadEntities: true,
      }) 无注释版
    }), */
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
        password: configService.get('DB_PSWD'), // 密码
        database: configService.get('DB_NAME'), // 数据库名
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: false, // 根据实体自动创建数据库表, 生产环境建议关闭, 实体的任何改动都会影响数据库的列以及数据
        autoLoadEntities: true, // 自动加载实体, 避免手动一个个导入
      })
    }),
    // RedisCacheModule,
    /* 加载对应模块
    module的顺序和controller中方法的顺序影响swaggerUI的API(按组)的顺序 */
    ArticleModule,
    UserModule,
    AuthModule,
    KindModule,
    TagModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
