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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Status, StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { GenericController } from '../generics/generic.controller';
import { ApiBody } from '@nestjs/swagger';
import { Between } from 'typeorm';

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
    return this.studentsService.create(newStudent);
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
