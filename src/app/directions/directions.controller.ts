import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsEntity } from './directions.entity';

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  findAll(): Promise<DirectionsEntity[]> {
    return this.directionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<DirectionsEntity> {
    return this.directionsService.findOne(id);
  }

  @Post()
  create(@Body() direction: DirectionsEntity): Promise<DirectionsEntity> {
    return this.directionsService.create(direction);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() direction: DirectionsEntity): Promise<DirectionsEntity> {
    return this.directionsService.update(id, direction);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.directionsService.remove(id);
  }
}
