import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsEntity } from './directions.entity';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { ApiBody } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { GenericController } from '../generics/generic.controller';
import { Direction } from 'readline';

@Controller('directions')
export class DirectionsController extends GenericController<DirectionsEntity, DirectionsService>{
  constructor(private readonly directionsService: DirectionsService) {super(directionsService)}


  @ApiBody({type: CreateDirectionDto, required: true})
  @Post()
  override async create(@Body() entity: DirectionsEntity) {
    return this.directionsService.create(entity);
  }

  @ApiBody({type: CreateDirectionDto, required: true})
  @Put(':id')
  override async update(@Param('id') id: number, @Body() direction: DirectionsEntity) {
    return this.directionsService.update(id, direction);
  }

}
