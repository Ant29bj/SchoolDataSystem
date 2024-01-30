import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GenericController } from '../generics/generic.controller';
import { StudentPayment } from './student-payment.entity';
import { StudentPaymentService } from './student-payment.service';
import { FindManyOptions, InsertResult } from 'typeorm';
import { StudentsService } from '../students/students.service';
import { CreatePaymentDto } from './dto/create-payment';

@Controller('/pagos')
export class StudentPaymentController extends GenericController<
  StudentPayment,
  StudentPaymentService
> {
  constructor(
    private readonly studentPaymentServie: StudentPaymentService,
    private readonly studentService: StudentsService,
  ) {
    super(studentPaymentServie);
  }

  @Get()
  override find(
    options?: FindManyOptions<StudentPayment>,
  ): Promise<StudentPayment[]> {
    return this.studentPaymentServie.find({ relations: ['student'] });
  }

  @Get('/corte')
  async getIfCorteNull() {
    return this.studentPaymentServie.getByCorte();
  }

  @Post('/mensualidad')
  async createPayment(
    @Query('matricula') matricula: string,
    @Body() requestBody: CreatePaymentDto,
  ): Promise<InsertResult> {
    const alumno = await this.studentService.findOne({
      where: {
        matricula: matricula,
      },
    });

    if (!alumno) {
      throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
    }

    this.studentService.abonarMensualidad(matricula, requestBody.importe);

    const alumnoModificado = await this.studentService.findOne({
      where: {
        matricula: matricula,
      },
    });

    var studentPayment = new StudentPayment();
    studentPayment.importe = requestBody.importe;
    studentPayment.nombreCliente = requestBody.nombreCliente;
    studentPayment.carrera = requestBody.carrera;
    studentPayment.concepto = requestBody.concepto;
    studentPayment.proximoPago = alumnoModificado.paymentDate;
    studentPayment.student = alumnoModificado;

    return this.studentPaymentServie.create(studentPayment);
  }

  @Post('/inscripcion')
  async pagarInscripcion(
    @Query('matricula') matricula: string,
    @Body() requestBody: CreatePaymentDto,
  ) {
    await this.studentService.pagarInscripcion(matricula, requestBody.importe);

    const estudianteAsignar = await this.studentService.findOne({
      where: {
        matricula: matricula,
      },
    });

    if (!estudianteAsignar)
      throw new HttpException('Hubo un problema', HttpStatus.NOT_FOUND);

    var studentPayment = new StudentPayment();
    studentPayment.importe = requestBody.importe;
    studentPayment.nombreCliente = requestBody.nombreCliente;
    studentPayment.carrera = requestBody.carrera;
    studentPayment.concepto = requestBody.concepto;
    studentPayment.student = estudianteAsignar;

    return this.studentPaymentServie.create(studentPayment);
  }
}
