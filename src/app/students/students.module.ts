import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from './students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentsEntity])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}