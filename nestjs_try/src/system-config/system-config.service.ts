import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfigEntity } from './entities/system-config.entity';

@Injectable()
export class SystemConfigService {
  constructor(
    @InjectRepository(SystemConfigEntity)
    private readonly systemConfigRepository: Repository<SystemConfigEntity>
  ) {}

  async getJwtGlobalVersion() {
    const config = await this.systemConfigRepository.findOne({
      where: { configKey: 'JWT_GLOBAL_VERSION' }
    });
    return Number(config?.configValue ?? 1);
  }
}
