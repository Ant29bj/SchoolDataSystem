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
  import { FindManyOptions } from 'typeorm';
  
  @Controller('teachers')
  export class TeachersController extends GenericController<
    TeachersEntity,
    TeachersService
  > {
    constructor(private readonly teachersService: TeachersService) {
      super(teachersService);
    }
  
    @Get()
    override find(
      options?: FindManyOptions<TeachersEntity>,
    ): Promise<TeachersEntity[]> {
      return this.teachersService.find({ relations: ['grupos'] });
    }
  }