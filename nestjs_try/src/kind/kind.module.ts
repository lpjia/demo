import { Module } from '@nestjs/common';
import { KindService } from './kind.service';
import { KindController } from './kind.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KindEntity } from './entities/kind.entity';
// import { RedisCacheModule } from '#/db/redis-cache.module';

@Module({
  // imports: [TypeOrmModule.forFeature([KindEntity]), RedisCacheModule],
  imports: [TypeOrmModule.forFeature([KindEntity])],
  controllers: [KindController],
  providers: [KindService]
})
export class KindModule {}
