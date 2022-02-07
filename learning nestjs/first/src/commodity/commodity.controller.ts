import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';


@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) { }

  @Post()
  create(@Body() createCommodityDto: CreateCommodityDto) {
    return this.commodityService.create(createCommodityDto);
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
