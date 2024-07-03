import { Module, forwardRef } from '@nestjs/common';
import { StudentsGroupsController } from './students_groups.controller';
import { StudentsGroupsService } from './students_groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsGroupsEntity } from './students_groups.entity';
import { StudentsModule } from '../students/students.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports:[TypeOrmModule.forFeature([StudentsGroupsEntity]), forwardRef(() => StudentsModule), forwardRef(() => GroupsModule)],
  controllers: [StudentsGroupsController],
  providers: [StudentsGroupsService],
  exports: [StudentsGroupsService],
})
export class StudentsGroupsModule {}
