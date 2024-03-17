import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './grades.entity';
import { GradesService } from './grades.service';
import { GradeController } from './grades.controller';
import { StudentsModule } from '../students/students.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity]), StudentsModule],
  controllers: [GradeController],
  providers: [GradesService],
})
export class GradesModule {}
