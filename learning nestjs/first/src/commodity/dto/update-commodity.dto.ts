import { PartialType, PickType, OmitType, IntersectionType } from '@nestjs/swagger';
import { CreateCommodityDto, AdditionalInfo } from './create-commodity.dto';

// export class UpdateCommodityDto extends PartialType(CreateCommodityDto) {}

// export class UpdateCommodityDto extends PickType(CreateCommodityDto, ['productName', 'position']) { }

// export class UpdateCommodityDto extends OmitType(CreateCommodityDto, ['productName', 'position']) { }

// export class UpdateCommodityDto extends IntersectionType(CreateCommodityDto, AdditionalInfo) { }

export class UpdateCommodityDto extends PartialType(
  OmitType(CreateCommodityDto, ['spec'])
) { }

