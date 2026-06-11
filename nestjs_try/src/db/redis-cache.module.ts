import { Module } from "@nestjs/common";
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from "@nestjs/config";
import KeyvRedis from '@keyv/redis';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.getOrThrow<string>('REDIS_HOST');
        const port = configService.get<string>('REDIS_PORT') ?? '6379';
        const password = configService.get<string>('REDIS_PASSWORD');
        const redisUrl = password
          ? `redis://:${encodeURIComponent(password)}@${host}:${port}/0`
          : `redis://${host}:${port}/0`;

        return {
          stores: [new KeyvRedis(redisUrl)],
        };
      }
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule { }