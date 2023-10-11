import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosEntity } from './empleados.entity';

@Controller('students')
export class EmpleadosController {
  constructor(private readonly studentsService: EmpleadosService) {}

  @Get()
  findAll(): Promise<EmpleadosEntity[]> {
    return this.studentsService.find();
  }
}
