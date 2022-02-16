import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { CommodityEntity } from './entities/commodity.entity';


export interface CommodityRo {
  list: CommodityEntity[]
  count: number,
  pageNum: number,
  pageSize: number,
}

// export interface CreateCommodityRo {
//   list: CreateCommodityDto[]
//   count: number,
//   pageNum: number,
//   pageSize: number,
// }


@Injectable()
export class CommodityService {
  constructor(
    @InjectRepository(CommodityEntity)
    private readonly commodityRepository: Repository<CommodityEntity>
  ) { }

  async create(commodity): Promise<CreateCommodityDto> {
    // async create(commodity: Partial<CommodityEntity>): Promise<CommodityEntity> {
    const { productName, shopName } = commodity
    // console.log('commodity: ', commodity)
    if (!productName) throw new HttpException('缺少商品名', 200)

    const product = await this.commodityRepository.findOne({
      where: { productName }
    })
    // console.log('product: ', product)
    if (product && shopName === product.shopName) throw new HttpException('商品已存在', 200)

    return await this.commodityRepository.save(commodity)
  }

  // 获取商品列表
  async findAll(query): Promise<CommodityRo> {
    const qb = await getRepository(CommodityEntity).createQueryBuilder('commodity')
    qb.where('1 = 1')
    qb.orderBy('commodity.create_time', 'DESC')

    const count = await qb.getCount()
    const { pageNum = 1, pageSize = 100, ...params } = query
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    const commodities = await qb.getMany()
    return { count, pageNum, pageSize, list: commodities }
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
