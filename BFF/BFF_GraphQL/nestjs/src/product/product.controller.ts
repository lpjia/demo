import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductAndPriceDto } from './dto/createProductAndPrice.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductNameQueryDto } from './dto/product-name-query.dto';
import { ProductResponseDTO } from './dto/productResponse.dto';

@ApiTags('商品')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: '查商品列表' })
  @ApiResponse({ type: ProductResponseDTO })
  @Get('list')
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: '根据name查询商品' })
  @Get('name')
  getProductByName(@Query() query: ProductNameQueryDto) {
    const { likeFlag, fieldValue } = query;

    if (likeFlag === 'yes') {
      return this.productService.findByNameLike(fieldValue);
    }
    return this.productService.findByNameExact(fieldValue);
  }

  @ApiOperation({ summary: '根据id查商品信息' })
  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe 内置pipe, 自动把id转为整数类型
    return await this.productService.getProductById(id);
  }

  @ApiOperation({ summary: '根据id查商品历史价格' })
  @Get(':id/priceHistory')
  async getPriceHistoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getPriceHistoryById(id);
  }

  @ApiOperation({ summary: '新增商品和价格' })
  @Post()
  async create(@Body() productAndPrice: CreateProductAndPriceDto) {
    return await this.productService.create(productAndPrice)
  }
}
