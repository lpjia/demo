import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from '#/junction-table/role-permission/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, RolePermissionEntity])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule { }
