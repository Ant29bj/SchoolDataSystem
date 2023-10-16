import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Promise<StudentsEntity[]> {
    return this.studentsService.findAll();
  }

  @Get(':matricula')
  findOne(@Param('matricula') matricula: string): Promise<StudentsEntity> {
    return this.studentsService.findOne(matricula);
  }

  @Post()
  create(@Body() student: CreateStudentDto): Promise<StudentsEntity> {
    return this.studentsService.create(student);
  }

  @Put(':matricula')
  update(@Param('matricula') matricula: string, @Body() student: StudentsEntity): Promise<StudentsEntity> {
    return this.studentsService.update(matricula, student);
  }

  @Delete(':matricula')
  remove(@Param('matricula') matricula: string): Promise<void> {
    return this.studentsService.remove(matricula);
  }
}
