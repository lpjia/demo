import { Module } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CommodityController } from './commodity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommodityEntity } from './entities/commodity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommodityEntity])],
  controllers: [CommodityController],
  providers: [CommodityService]
})
export class CommodityModule { }
