import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';
import { ParentsModule } from '../parents/parents.module';
import { StudentsGroupsModule } from '../students_groups/students_groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity]), ParentsModule, StudentsGroupsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService, TypeOrmModule],
})
export class StudentsModule {}
