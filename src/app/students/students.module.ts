import { Module, forwardRef } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';
import { ParentsModule } from '../parents/parents.module';
import { StudentsGroupsModule } from '../students_groups/students_groups.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity]), forwardRef(() => ParentsModule), forwardRef(() => StudentsGroupsModule), forwardRef(() => GroupsModule),],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService, TypeOrmModule],
})
export class StudentsModule {}
