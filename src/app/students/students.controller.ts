import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsEntity } from './students.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Promise<StudentsEntity[]> {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<StudentsEntity> {
    return this.studentsService.findOne(id);
  }

  @Post()
  create(@Body() student: StudentsEntity): Promise<StudentsEntity> {
    return this.studentsService.create(student);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() student: StudentsEntity): Promise<StudentsEntity> {
    return this.studentsService.update(id, student);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.studentsService.remove(id);
  }
}
