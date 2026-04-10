import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UnitResponseDTO } from './dto/unitResponse.dto';

@ApiTags('计价单位')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) { }

  @ApiOperation({ summary: '查单位列表' })
  @ApiOkResponse({ type: [UnitResponseDTO] })
  @Get('list')
  findAll() {
    return this.unitService.findAll();
  }
}
