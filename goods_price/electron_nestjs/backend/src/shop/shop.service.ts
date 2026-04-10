import { HttpException, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>
  ) { }

  // 查店列表
  findAll() {
    return this.shopRepository.find()
  }

  // 用id查店信息
  findOne(id: number) {
    return this.shopRepository.findOne({
      where: { id },
    });
  }

  // 用店id查所有商品
  async getProductListByShopId(id: number) {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: ['productList'],
    })

    if (!shop) {
      throw new HttpException('shop不存在', 404);
    }

    return shop;
  }
}
