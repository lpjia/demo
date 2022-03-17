import { PartialType } from '@nestjs/swagger';
import { CreateInfoDto } from './create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {}
