import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentsEntity } from './parents.entity';

@Controller('parents')
export class ParentsController {
  constructor(private parentsService: ParentsService) {}

  @Get()
  findAll(): Promise<ParentsEntity[]> {
    return this.parentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ParentsEntity> {
    return this.parentsService.findOne(id);
  }

  @Post()
  create(@Body() parent: ParentsEntity): Promise<ParentsEntity> {
    return this.parentsService.create(parent);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() parent: ParentsEntity): Promise<ParentsEntity> {
    return this.parentsService.update(id, parent);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.parentsService.remove(id);
  }
}
