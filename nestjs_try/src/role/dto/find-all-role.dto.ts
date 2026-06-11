import { IsPositive, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PageQueryDto } from '#/core/dto/page-query.dto';

export class FindAllRoleDto extends PageQueryDto { }
