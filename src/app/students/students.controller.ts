

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Status, StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { GenericController } from '../generics/generic.controller';
import { ApiBody } from '@nestjs/swagger';
import {
  Between,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';
import { query } from 'express';
import { log } from 'console';

@Controller('students')
export class StudentsController extends GenericController<
  StudentsEntity,
  StudentsService
> {
  constructor(private readonly studentsService: StudentsService) {
    super(studentsService);
  }

  @ApiBody({ type: CreateStudentDto, required: true })
  @Post()
  override async create(@Body() newStudent: StudentsEntity) {
    console.log(newStudent.birthDay);
    const year = new Date(newStudent.birthDay).getUTCFullYear().toString();
    const mes = new Date(newStudent.birthDay).getUTCMonth() + 1;
    newStudent.matricula = `${year}${mes}${newStudent.curp.substring(
      0,
      4,
    )}${this.studentsService.generateRandomChars(3)}`;
    const fecha = new Date();

    const paymentDate = new Date(fecha.getTime() + 30 * 24 * 60 * 60 * 1000);

    newStudent.registrationDate = fecha;
    newStudent.paymentDate = paymentDate;

    return this.studentsService.create(newStudent);
  }

  @Get('/find')
  async buscarStudent(@Query('options') options: string) {
    return this.studentsService.find({ where: JSON.parse(options) });
  }

  @Get()
  override find(options?: FindManyOptions<StudentsEntity>) {
    return this.studentsService.find({ relations: ['group'] });
  }

  @Get('/:cadena')
  findLike(@Param('cadena') cadena: string) {
    return this.studentsService.findLike(cadena);
  }

  @Put()
  @Patch()
  override update(@Query('id') id: number, @Body() entity: StudentsEntity) {
    return this.studentsService.update(id, entity);
  }

  @Delete()
  override delete(@Query('id') id: number) {
    return this.studentsService.delete(id);
  }

  @Post('/abonar')
  async abonarMensualidad(
    @Query('matricula') matricula: string,
    @Query('pago') pago: number,
  ) {
    const verficar = !matricula || !pago ? false : true;
    if (!verficar)
      new HttpException('Datos incompletos', HttpStatus.BAD_REQUEST);

    try {
      await this.studentsService.abonarMensualidad(matricula, pago);
      return { message: 'Operacion exitosa' };
    } catch (err) {
      return err;
    }
  }

  @Get('/proximos')
  async mostrarProximos() {
    return this.studentsService.find({ where: { status: Status.Proximo } });
  }
}