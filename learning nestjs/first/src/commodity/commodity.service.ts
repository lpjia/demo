import { Injectable } from '@nestjs/common';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@Injectable()
export class CommodityService {
  create(createCommodityDto: CreateCommodityDto) {
    return 'This action adds a new commodity';
  }

  findAll() {
    return `This action returns all commodity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commodity`;
  }

  update(id: number, updateCommodityDto: UpdateCommodityDto) {
    return `This action updates a #${id} commodity`;
  }

  remove(id: number) {
    return `This action removes a #${id} commodity`;
  }
}
