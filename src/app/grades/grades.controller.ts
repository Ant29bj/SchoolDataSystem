import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { CreateGradeDto } from './dtos/create-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradesService) {}

  @Post()
  create(@Body() grade: CreateGradeDto) {
    const result = this.gradeService.setStudentGrade(
      grade.studentId,
      grade.grade,
    );

    return result;
  }

  @Get()
  getGrades(@Query('studentId') studentId: number) {
    return this.gradeService.getGradesByStudent(studentId);
  }
}
