import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersEntity } from './teachers.entity';
import { GenericController } from '../generics/generic.controller';

@Controller('teachers')
export class TeachersController extends GenericController<
  TeachersEntity,
  TeachersService
> {
  constructor(private readonly teachersService: TeachersService) {
    super(teachersService);
  }
}
