import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('店')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @ApiOperation({ summary: '查店列表' })
  @Get('list')
  findAll() {
    return this.shopService.findAll();
  }

  @ApiOperation({ summary: '用id查店信息' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @ApiOperation({ summary: '用店id查所有商品' })
  @Get(':id/productList')
  async getProductListByShopId(@Param('id', ParseIntPipe) id: number) {
    return await this.shopService.getProductListByShopId(id)
  }
}
