import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { PriceHistoryEntity } from './entities/priceHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, PriceHistoryEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
