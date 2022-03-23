import { Injectable } from '@nestjs/common';
import { CreateUseriDto } from './dto/create-useri.dto';
import { UpdateUseriDto } from './dto/update-useri.dto';

@Injectable()
export class UseriService {
  create(createUseriDto: CreateUseriDto) {
    return 'This action adds a new useri';
  }

  findAll() {
    return `This action returns all useri`;
  }

  findOne(id: number) {
    return `This action returns a #${id} useri`;
  }

  update(id: number, updateUseriDto: UpdateUseriDto) {
    return `This action updates a #${id} useri`;
  }

  remove(id: number) {
    return `This action removes a #${id} useri`;
  }
}
