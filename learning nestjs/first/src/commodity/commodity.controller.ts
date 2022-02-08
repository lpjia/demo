import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommodityService } from './commodity.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';

@ApiTags('商品')
@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) { }


  @ApiOperation({ summary: '创建商品' })
  @Post()
  async create(@Body() commodity: CreateCommodityDto) {
    return await this.commodityService.create(commodity);
  }

  @Get()
  findAll() {
    return this.commodityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commodityService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommodityDto: UpdateCommodityDto) {
    return this.commodityService.update(+id, updateCommodityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commodityService.remove(+id);
  }
}
