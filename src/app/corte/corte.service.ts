import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CorteEntity } from './corte.entity';
import { GenericService } from '../generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Repository } from 'typeorm';
import { StudentPaymentService } from '../students-payment/student-payment.service';
import { SetearHorarioCorte } from './dto/SetaerHorarioCorte';
import { TransformarDeuda } from '../students/utlis/transform-type-money';

const CON_IVA_AGREGADO = 1.16
const IVA = 0.16

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
      relations: ['pagos']
    })
  }

  async createCorte(data: SetearHorarioCorte) {
    let nuevoCorte = new CorteEntity();
    let ingresoTotal: number = 0
    let horaInicio = new Date(data.fecha);
    let horaFin = new Date(data.fecha)

    const inicioHoraMinutos = data.horaInicio.split(':')
    horaInicio.setHours(parseInt(inicioHoraMinutos[0], 10))
    horaInicio.setMinutes(parseInt(inicioHoraMinutos[1], 10))

    const finHoraMinutos = data.horaFin.split(':')
    horaFin.setHours(parseInt(finHoraMinutos[0], 10))
    horaFin.setMinutes(parseInt(finHoraMinutos[1], 10))
    horaInicio.setDate(horaInicio.getDate() + 1);
    horaFin.setDate(horaFin.getDate() + 1);
    console.log("hora inicio: ",horaInicio, "hora inicio: ", horaFin);
    const transactions = await this.studentPaymentService.find({
      where: {
        createAt: Between(horaInicio, horaFin),
        corte: IsNull()
      },
    });

    if (transactions.length < 1) return new HttpException('No hay pagos para corte', HttpStatus.CONFLICT)

    transactions.map(async (data) => {
      ingresoTotal += TransformarDeuda(data.importe)
    })
    nuevoCorte.fechaCorte = new Date(data.fecha)
    nuevoCorte.horaInicio = data.horaInicio
    nuevoCorte.horaFin = data.horaFin
    nuevoCorte.subTotal = ingresoTotal
    nuevoCorte.tarifaIva = ingresoTotal * IVA
    nuevoCorte.total = ingresoTotal * CON_IVA_AGREGADO
    nuevoCorte.pagos = transactions

    return this.corteRepository.save(nuevoCorte)
  }
}
