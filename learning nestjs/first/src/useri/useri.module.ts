import { Module } from '@nestjs/common';
import { UseriService } from './useri.service';
import { UseriController } from './useri.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseriEntity } from './entities/useri.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UseriEntity])],
  controllers: [UseriController],
  providers: [UseriService]
})
export class UseriModule { }
