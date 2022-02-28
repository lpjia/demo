import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommodityRo, CommodityService } from './commodity.service';
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


  @ApiOperation({ summary: '查询某商品名' })
  @Get('findByName')
  async findByName(@Query('name') name: string) {
    return await this.commodityService.findByName(name)
  }


  @ApiOperation({ summary: '获取商品列表' })
  @Get()
  async findAll(@Query() query): Promise<CommodityRo> {
    return await this.commodityService.findAll(query);
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
