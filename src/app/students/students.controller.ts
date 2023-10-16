import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { GenericController } from '../generics/generic.controller';

@Controller('students')
export class StudentsController extends GenericController<
  StudentsEntity,
  StudentsService
> {
  constructor(private readonly studentsService: StudentsService) {
    super(studentsService);
  }
}
