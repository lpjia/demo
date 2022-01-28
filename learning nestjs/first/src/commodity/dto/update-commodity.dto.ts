import { PartialType } from '@nestjs/swagger';
import { CreateCommodityDto } from './create-commodity.dto';

export class UpdateCommodityDto extends PartialType(CreateCommodityDto) {}
