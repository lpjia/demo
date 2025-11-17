import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnitEntity } from './entities/unit.entity';
import { Repository } from 'typeorm';
import { UnitResponseDTO } from './dto/unitResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>
  ) { }

  // 查单位列表
  async findAll(): Promise<UnitResponseDTO[]> {
    const units = await this.unitRepository.find();
    return plainToInstance(UnitResponseDTO, units, { excludeExtraneousValues: true });
  }

  // create(createUnitDto: CreateUnitDto) {
  //   return 'This action adds a new unit';
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} unit`;
  // }

  // update(id: number, updateUnitDto: UpdateUnitDto) {
  //   return `This action updates a #${id} unit`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} unit`;
  // }
}
