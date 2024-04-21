import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CorteEntity } from './corte.entity';
import { GenericService } from '../generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { StudentPaymentService } from '../students-payment/student-payment.service';
import { SetearHorarioCorte } from './dto/SetaerHorarioCorte';
import { TransformarDeuda } from '../students/utlis/transform-type-money';
import { log } from 'console';

const CON_IVA_AGREGADO = 1.16;
const IVA = 0.16;

@Injectable()
export class CorteService extends GenericService<CorteEntity> {
  constructor(
    @InjectRepository(CorteEntity)
    private readonly corteRepository: Repository<CorteEntity>,
    private readonly studentPaymentService: StudentPaymentService,
  ) {
    super(corteRepository);
  }

  findAll() {
    return this.corteRepository.find({
      relations: ['pagos'],
    });
  }

  async createCorte(data: SetearHorarioCorte) {
    let nuevoCorte = new CorteEntity();
    let ingresoTotal: number = 0;

    // Crear objetos Date para la hora de inicio y fin
    let d1 = new Date(data.fecha);
    d1.toLocaleString('en-US', { timeZone: 'America/Mazatlan' });
    log('HELO', d1.toISOString());
    log('date', new Date(d1.toISOString()));

    // hora inicio 18/04/2024UTC16:00 18/04/2024UTC20:00
    const transactions = await this.studentPaymentService.find({
      where: {
        createAt: MoreThanOrEqual(d1),
        corte: IsNull(),
      },
    });

    console.log(transactions);

    if (transactions.length < 1)
      return new HttpException('No hay pagos para corte', HttpStatus.CONFLICT);

    transactions.map(async (data) => {
      ingresoTotal += TransformarDeuda(data.importe);
    });
    nuevoCorte.fechaCorte = new Date(data.fecha);
    nuevoCorte.horaInicio = data.horaInicio;
    nuevoCorte.horaFin = data.horaFin;
    nuevoCorte.subTotal = ingresoTotal;
    nuevoCorte.tarifaIva = ingresoTotal * IVA;
    nuevoCorte.total = ingresoTotal * CON_IVA_AGREGADO;
    nuevoCorte.pagos = transactions;

    return this.corteRepository.save(nuevoCorte);
  }
}
