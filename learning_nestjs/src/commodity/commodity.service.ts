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


  async findByName(name: string): Promise<CreateCommodityDto[]> {
    const qb = await getRepository(CommodityEntity).createQueryBuilder('commodity')

    // qb.where('commodity.productName LIKE :productName', { productName: `%${name}%` })

    // 更简洁的写法
    qb.where('commodity.productName LIKE "%' + name + '%"')
      .orderBy("commodity.createTime", "DESC")

    // qb.where('commodity.productName LIKE :param', { param: `%${name}%` })
    //   .orderBy("commodity.createTime", "ASC")

    // :后跟一个'变量', 可以自定义属性名
    // 后面跟个对象是 setParameters 的方式, setParameters({ productName: `%${name}%` })
    // 多查询条件适合这样写?
    // qb.where('commodity.productName LIKE :productName AND commodity.unitPrice < :param', {
    //   productName: `%${name}%`,
    //   param: 10,
    // })

    // 单独获取
    const list = await qb.getMany();
    // const count = await qb.getCount()
    // 可以同时获取
    // const [list, total] = await qb.getManyAndCount();

    return list
    // return { count: total, list }
    // return { pageNum: 1, pageSize: 100, count, list }
  }


  async findAll(query): Promise<CommodityRo> {
    const qb = await getRepository(CommodityEntity).createQueryBuilder('commodity')
    qb.where('1 = 1')
    qb.orderBy('commodity.create_time', 'DESC')

    const count = await qb.getCount()
    const { pageNum = 1, pageSize = 100, ...params } = query
    qb.limit(pageSize)
    qb.offset(pageSize * (pageNum - 1))

    const commodities = await qb.getMany()
    return { pageNum, pageSize, count, list: commodities }
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
