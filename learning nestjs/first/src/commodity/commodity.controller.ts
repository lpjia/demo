import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommodityRo, CommodityService } from './commodity.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';


// // 测试枚举
// enum UserRole {
//   Admin = 'Admin',
//   Moderator = 'Moderator',
//   User = 'User'
// }


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
  // @ApiParam({
  //   name: 'id',
  //   description: '这是用户id',
  //   // required: false
  // })

  // @ApiQuery 和 @ApiParam 在这好像区别不大

  // @ApiQuery({
  //   name: 'name',
  //   description: '这是名称',
  //   required: false // 非必填项
  // })

  // @ApiQuery({
  //   name: 'role',
  //   enum: UserRole
  // })

  // async findByName(@Query('name') name: string, @Query('id') id:string) {
  // async findByName(@Query('name') name: string) { // @Query('name') 是查询字符串形式传参, 在 swagger 是必填项
  // async findByName(@Query('name') name: string, @Query('role') role: UserRole = UserRole.User) {
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
