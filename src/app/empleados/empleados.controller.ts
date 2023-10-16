import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosEntity } from './empleados.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Get()
  findAll(): Promise<EmpleadosEntity[]> {
    return this.empleadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<EmpleadosEntity> {
    return this.empleadosService.findOne(id);
  }

  @Post()
  create(@Body() empleado: CreateEmpleadoDto): Promise<EmpleadosEntity> {
    return this.empleadosService.create(empleado);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() empleado: EmpleadosEntity): Promise<EmpleadosEntity> {
    return this.empleadosService.update(id, empleado);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.empleadosService.remove(id);
  }
}
