import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosEntity } from './empleados.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { ApiBody } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { GenericController } from '../generics/generic.controller';

@Controller('empleados')
export class EmpleadosController extends GenericController<EmpleadosEntity, EmpleadosService>{
  constructor(private readonly empleadosService: EmpleadosService) {super(empleadosService)}

  @ApiBody({type: CreateEmpleadoDto, required: true})
  @Post()
  override async create(@Body() empleado: EmpleadosEntity){
    return this.empleadosService.create(empleado);
  }

  @ApiBody({type: CreateEmpleadoDto, required: true})
  @Put(':id')
  override async update(@Param('id') id: number, @Body() empleado: EmpleadosEntity) {
    return this.empleadosService.update(id, empleado);
  }

  
}
