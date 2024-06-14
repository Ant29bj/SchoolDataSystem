import { Module } from '@nestjs/common';
import { StudentsGroupsController } from './students_groups.controller';
import { StudentsGroupsService } from './students_groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from '../students/students.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentsEntity])],
  controllers: [StudentsGroupsController],
  providers: [StudentsGroupsService]
})
export class StudentsGroupsModule {}
