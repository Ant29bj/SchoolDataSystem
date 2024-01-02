import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Between, IsNull, MoreThan } from 'typeorm';
import { Status, StudentsEntity } from './students.entity';
import { GenericService } from '../generics/generic.service';

// Agregar historial de pago del alumno

@Injectable()
export class StudentsService
  extends GenericService<StudentsEntity>
  implements OnModuleInit
{
  private intervalo: NodeJS.Timeout;
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {
    super(studentsRepository);
  }

  async onModuleInit() {
    this.iniciarRevisionPagos();
  }
  private async revisarDeudasDePago() {
    const currentDay = new Date();

    await this.studentsRepository.update(
      { paymentDate: LessThan(currentDay) },
      { status: Status.Debe },
    );

    const tresDias = new Date(currentDay);
    tresDias.setDate(currentDay.getDate() - 3);

    await this.studentsRepository.update(
      { paymentDate: LessThan(tresDias), multa: false },
      { debt: () => 'debt + CAST(80 AS money)' },
    );

    await this.studentsRepository.update(
      { status: IsNull(), debt: MoreThan(0) },
      { status: Status.Debe },
    );

    const unaSemanaFuturo = new Date(currentDay);
    unaSemanaFuturo.setDate(unaSemanaFuturo.getDate() - 7);
    const estudiantesPorPagar = await this.studentsRepository.find({
      where: {
        paymentDate: Between(currentDay, unaSemanaFuturo),
      },
    });

    for (const student of estudiantesPorPagar) {
      student.status = Status.Proximo;
      await this.studentsRepository.save(student);
    }
    // const estudiantesSobregirados = await this.studentsRepository.find({
    //   where: {
    //     paymentDate: LessThan(currentDay),
    //   },
    // });

    // for (const student of estudiantesSobregirados) {
    //   student.status = Status.Debe;

    //   await this.studentsRepository.save(student);
    // }
  }

  iniciarRevisionPagos() {
    const fecha = new Date();
    const horario = new Date(fecha);
    horario.setHours(10, 53, 0, 0); // hora las 11:59 de la noche
    const intervalo = 24 * 60 * 60 * 1000;
    console.log('entro');

    let restanteDeTiempo = horario.getTime() - fecha.getTime();

    if (restanteDeTiempo < 0) {
      restanteDeTiempo += intervalo;
    }

    this.intervalo = setInterval(
      () => this.revisarDeudasDePago(),
      restanteDeTiempo,
    );
  }

  async abonarMensualidad(matricula: string, pago: number) {
    const sigPago = new Date(); // yyyy/MM/dd:hr:min:seg:mil
    sigPago.setDate(sigPago.getDate() + 28);
    const auxStudent = await this.studentsRepository.findOne({
      where: {
        matricula: matricula,
      },
    });
    // queda pendiente de como calcular la siguiente fecha de pago
    if (auxStudent) {
      auxStudent.debt -= pago;
      if (auxStudent.debt == 0) {
        auxStudent.status = Status.NoDebe;
      } else if (auxStudent.debt > 0) {
        auxStudent.status = Status.Debe;
      }
      auxStudent.paymentDate = sigPago;
      await this.studentsRepository.save(auxStudent);
    } else {
      throw new HttpException('Alumno no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  generarMatricula(data: StudentsEntity): string {
    console.log(data.birthDay.getMonth);
    return '';
  }
  // descuento pogo por a delantado minimo 20%

  generateRandomChars(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
}
