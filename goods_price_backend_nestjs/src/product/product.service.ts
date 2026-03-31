import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository, Like, Raw, IsNull } from 'typeorm';
import { PriceHistoryEntity } from './entities/priceHistory.entity';
import { plainToInstance } from 'class-transformer';
import { ProductResponseDTO } from './dto/productResponse.dto';
import { calcPricePerByPrice } from 'src/common/utils/calcPricePer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(PriceHistoryEntity)
    readonly productHistoryRepository: Repository<PriceHistoryEntity>
  ) { }

  // 查商品列表
  async findAll(): Promise<ProductResponseDTO[]> {
    const units = await this.productRepository.find();
    return plainToInstance(ProductResponseDTO, units, { excludeExtraneousValues: true });
  }

  // 通过id查商品
  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      /* select: [
        'id',
        'productName',
        'productAlias',
        'shopId',
        'createTime',
        'updateTime',
        'deleteTime',
      ], */
      // 关联查询（对应原 Egg.js 的 include）
      relations: [
        'shopInfo', // 关联 Shop（别名 shopInfo）
        'priceHistoryList', // 关联 PriceHistory（别名 priceHistoryList）
        'priceHistoryList.unitInfo', // 嵌套关联 PriceHistory 的 Unit（别名 unitInfo）
      ],
      /* 关联实体的字段排除（TypeORM 用 loadEagerRelations + select 或单独配置）
      这里通过 "relations 层级" + "select 排除" 实现关联实体的字段过滤 */
      loadEagerRelations: true, // 启用关联加载（默认 true，可省略）
    })

    if (!product) {
      throw new HttpException('product不存在', 404);
    }

    return product;
  }

  // 模糊查询同种商品
  findByNameLike(fieldValue: string) {
    return this.productRepository.find({
      where: {
        productName: Like(`%${fieldValue}%`)
      },
      relations: ['shopInfo'],
      loadEagerRelations: true
    })
  }

  // 精准查询同种商品不同店的不同价格
  findByNameExact(fieldValue: string) {
    return this.productRepository.find({
      where: {
        productName: fieldValue
      },
      relations: [
        'shopInfo',
        'priceHistoryList',
        'priceHistoryList.unitInfo'
      ],
      loadEagerRelations: true
    })
  }

  // 通过id查商品历史价格
  async getPriceHistoryById(id: number) {
    const productHistory = await this.productHistoryRepository.find({
      where: { productId: id },
      order: { buyTime: 'ASC' },
      relations: ['unitInfo'],
      loadEagerRelations: true
    })

    return productHistory.map((item => {
      let obj: any = {
        ...item,
        unitName: item.unitInfo.unitName
      }
      delete obj.unitInfo

      return obj
    }))
  }

  // 新增商品和价格
  async create(productAndPrice: Partial<PriceHistoryEntity & ProductEntity>): Promise<string> {
    const {
      productName, price, unitId, shopId,
      buyTime, spec, note,
      productAlias
    } = productAndPrice
    const pricePer = calcPricePerByPrice(spec!, price!)

    // Product表的 productName + shopId, 这2个字段确定唯一性
    let product = await this.productRepository.findOneBy({ productName, shopId })

    // 如果没查到, 说明商品表应该增加一条
    if (!product) {
      product = await this.productRepository.save({ productName, productAlias, shopId, pricePer });
    }

    const has = await this.hasDuplicateHistory(product.id, productAndPrice)
    // 如果没查到, 应该增加一条
    if (!has) {
      await this.productHistoryRepository.save({
        productId: product.id,
        price,
        unitId,
        spec,
        pricePer,
        buyTime,
        note,
      });
    }
    else {
      throw new HttpException('数据重复', 409);
    }

    return `${product.productName} ${price}`
  }

  /* 怎么判断PriceHistory表的数据是否重复?
  只要buyTime有值且日期不重复(不考虑时分秒), 就表示不一样
  productId price unitId */
  async hasDuplicateHistory(productId: number, productAndPrice: any): Promise<PriceHistoryEntity | null> {
    const { price, unitId, buyTime } = productAndPrice;

    const whereCondition: any = {
      productId,
      price,
      unitId,
    };

    if (buyTime) {
      // 参数化查询，防止SQL注入
      whereCondition.buyTime = Raw(alias => `DATE(${alias}) = DATE(:buyTime)`, { buyTime });
    } else {
      whereCondition.buyTime = IsNull();
    }

    return await this.productHistoryRepository.findOne({
      where: whereCondition
    });
  }
}
