import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersEntity } from './teachers.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(): Promise<TeachersEntity[]> {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TeachersEntity> {
    return this.teachersService.findOne(id);
  }

  @Post()
  create(@Body() teacher: TeachersEntity): Promise<TeachersEntity> {
    return this.teachersService.create(teacher);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() teacher: TeachersEntity): Promise<TeachersEntity> {
    return this.teachersService.update(id, teacher);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teachersService.remove(id);
  }
}
