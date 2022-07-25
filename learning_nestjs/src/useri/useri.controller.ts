import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseriService } from './useri.service';
import { CreateUseriDto } from './dto/create-useri.dto';
import { UpdateUseriDto } from './dto/update-useri.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('测试用户一对一')
@Controller('useri')
export class UseriController {
  constructor(private readonly useriService: UseriService) { }

  @Post()
  create(@Body() createUseriDto: CreateUseriDto) {
    return this.useriService.create(createUseriDto);
  }

  @Get()
  findAll() {
    return this.useriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.useriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUseriDto: UpdateUseriDto) {
    return this.useriService.update(+id, updateUseriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.useriService.remove(+id);
  }
}
