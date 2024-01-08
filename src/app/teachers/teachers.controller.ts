import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersEntity } from './teachers.entity';
import { GenericController } from '../generics/generic.controller';
import { FindManyOptions } from 'typeorm';

@Controller('teachers')
export class TeachersController extends GenericController<
  TeachersEntity,
  TeachersService
> {
  constructor(private readonly teachersService: TeachersService) {
    super(teachersService);
  }

  @Get('/find')
async buscarTeacher(@Query('options') options: string) {
  return this.teachersService.find({ where: JSON.parse(options) });
}

@Get()
override find(options?: FindManyOptions<TeachersEntity>) {
  return this.teachersService.find({ relations: ['group'] });
}

@Get('/:cadena')
findLike(@Param('cadena') cadena: string) {
  return this.teachersService.findLike(cadena);
}

@Put()
@Patch()
override update(@Query('id') id: number, @Body() entity: TeachersEntity) {
  return this.teachersService.update(id, entity);
}

@Delete()
override delete(@Query('id') id: number) {
  return this.teachersService.delete(id);
}
}