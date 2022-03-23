import { PartialType } from '@nestjs/swagger';
import { CreateUseriDto } from './create-useri.dto';

export class UpdateUseriDto extends PartialType(CreateUseriDto) {}
