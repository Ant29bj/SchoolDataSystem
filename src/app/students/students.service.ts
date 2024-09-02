import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Between, IsNull, MoreThan } from 'typeorm';
import { Status, StudentsEntity } from './students.entity';
import { GenericService } from '../generics/generic.service';
import { Cron } from '@nestjs/schedule';
import { TransformarDeuda } from './utlis/transform-type-money';

// Agregar historial de pago del alumno
const IMPORTE_MULTA: number = 80;
const DIA_MES: number = 28;

@Injectable()
export class StudentsService extends GenericService<StudentsEntity> {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {
    super(studentsRepository);
  }
  // mm:HH:dd:MM:dw
  @Cron('59 23 * * *')
  async handleActualizarEstudiantesMensual() {
    this.renovarMensualidad();
    this.updateAlumnos();
  }
  // async createStudent(student: StudentsEntity): Promise<StudentsEntity> {
  //   const newStudent = this.studentsRepository.create(student);
  //   return await this.studentsRepository.save(newStudent);
  // }
  async renovarMensualidad() {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const fechaFinalDelDia = new Date(fechaActual);
    fechaFinalDelDia.setHours(23, 59, 59, 999);
    const fechaDentroUnMes = new Date(fechaActual);
    //console.log(fechaActual)
    const students = await this.studentsRepository.find({
      where: {
        paymentDate: Between(fechaActual, fechaFinalDelDia),
      },
      relations: ['studentGroups', 'studentGroups.group','studentGroups.group.carrera'],
    });

    if (students.length === 0) return;

    fechaDentroUnMes.setDate(fechaDentroUnMes.getDate() + 28);
    //console.log('fechaDentroUnMes: ', fechaDentroUnMes)
    for (const student of students) {
      //console.log(student)
      let IMPORTE_MENSUALIDAD = 0;
      let studentGroups = Array.isArray(student.studentGroups) 
      ? student.studentGroups 
      : [student.studentGroups];
      for (const studentGroup of studentGroups) {
        IMPORTE_MENSUALIDAD += TransformarDeuda(studentGroup.group.carrera.mensualidad);
      }
      let deudaTransformada = TransformarDeuda(student.debt);
      deudaTransformada += IMPORTE_MENSUALIDAD;
      if (deudaTransformada <= student.sobrePago) {
        student.sobrePago -= deudaTransformada;
        student.debt = 0;
      } else {
        deudaTransformada -= student.sobrePago;
        student.sobrePago = 0;
        student.debt = deudaTransformada;
      }

      if (student.debt > 0) {
        student.status = Status.Debe;
      } else if (student.sobrePago > 0) {
        student.status = Status.Adelantado;
      } else if (student.sobrePago === 0 && student.debt === 0) {
        student.paymentDate = fechaDentroUnMes;
        student.status = Status.NoDebe;
      }
      //console.log('student:    ',student)
      await this.update(student.id, student);
    }
  }

  async updateAlumnos() {
    const fechaActual = new Date();
    const students = await this.find({
      where: {
        paymentDate: LessThan(fechaActual),
      },
    });
    if (students.length === 0) return;

    for (const student of students) {
      const diffMilis = fechaActual.getTime() - student.paymentDate.getTime();
      const diffDias = diffMilis / (1000 * 60 * 60 * 24);
      const deuda = TransformarDeuda(student.debt);

      if (student.multas < 3 && diffDias > 3 && deuda > 0) {
        student.debt = deuda + IMPORTE_MULTA;
        student.multas += 1;
      }
      student.status = Status.Debe;
      await this.update(student.id, student);
    }
  }

  async abonarMensualidad(matricula: string, pago: number) {
    const student = await this.studentsRepository.findOne({
      where: {
        matricula: matricula,
      },
      relations: ['studentGroups', 'studentGroups.group','studentGroups.group.carrera'],
    });
    student.sobrePago += pago;
    let deuda = TransformarDeuda(student.debt);
    
    let IMPORTE_MENSUALIDAD = 0;
    let studentGroups = Array.isArray(student.studentGroups) 
    ? student.studentGroups 
    : [student.studentGroups];
    for (const studentGroup of studentGroups) {
      console.log(studentGroup)
      IMPORTE_MENSUALIDAD += TransformarDeuda(studentGroup.group.carrera.mensualidad);
    }

    if (student.sobrePago > deuda) {
      student.sobrePago -= deuda;
      student.debt = 0;
    } else if (student.sobrePago <= deuda) {
      deuda -= student.sobrePago;
      student.sobrePago = 0;
      student.debt = deuda;
    }

    if (student.sobrePago > 0) {
      const mesesAbonados = Math.trunc(student.sobrePago / IMPORTE_MENSUALIDAD);
      const sigFechaPago = new Date(student.paymentDate);
      sigFechaPago.setDate(student.paymentDate.getDate() + DIA_MES);
      if (student.sobrePago >= IMPORTE_MENSUALIDAD) {
        sigFechaPago.setDate(
          student.paymentDate.getDate() + mesesAbonados * DIA_MES,
        );
      }

      student.paymentDate = sigFechaPago;
      student.status = Status.Adelantado;
    }

    if (student.debt == 0) {
      const sigFechaPago = new Date(student.paymentDate);
      sigFechaPago.setDate(student.paymentDate.getDate() + DIA_MES);
      student.paymentDate = sigFechaPago;
      student.status = Status.NoDebe;
    }

    return this.update(student.id, student);
  }

  async pagarInscripcion(matricula: string, pago: number) {
    const student = await this.studentsRepository.findOne({
      where: {
        matricula: matricula,
      },
    });
    let inscripcion = TransformarDeuda(student.inscripcion)
    if (inscripcion == 0) {
      return '';
    }

    if (inscripcion <= 0)
      return new HttpException('Inscripcion pagada', HttpStatus.BAD_GATEWAY);

    if (!student)
      return new HttpException('Alumno not Found', HttpStatus.NOT_FOUND);

    inscripcion -= pago;
    student.inscripcion = inscripcion;

    return this.studentsRepository.update(student.id, student);
  }
  generateRandomChars(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  findLike(cadena: string) {
    return (
      this.studentsRepository
        .createQueryBuilder('student')
        .where('student.firstName ILIKE :cadena', { cadena: `%${cadena}%` })
        .orWhere('student.lastName ILIKE :cadena', { cadena: `%${cadena}%` })
        .orWhere('student.email ILIKE :cadena', { cadena: `%${cadena}%` })
        .orWhere('student.curp ILIKE :cadena', { cadena: `%${cadena}%` })
        .orWhere('student.matricula ILIKE :cadena', { cadena: `%${cadena}%` })
        // Agrega más campos según sea necesario
        .getMany()
    );
  }

  async findGroup(studentId: number) {
    return this.studentsRepository.findOne({
      where: {
        id: studentId,
      },
      relations: ['group.teacher', 'group.carrera'],
    });
  }
}
