import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsEntity } from './groups.entity';
import { TeachersModule } from '../teachers/teachers.module';
import { TeachersService } from '../teachers/teachers.service';
import { TeachersEntity } from '../teachers/teachers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupsEntity]), TeachersModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService, TypeOrmModule],
})
export class GroupsModule {}
