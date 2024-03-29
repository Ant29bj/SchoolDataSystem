import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';
import { ParentsEntity } from '../parents/parents.entity';
import { ParentsService } from '../parents/parents.service';
import { ParentsModule } from '../parents/parents.module';


@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity]), ParentsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
