import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { StudentPayment } from './student-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class StudentPaymentService extends GenericService<StudentPayment> {
  constructor(
    @InjectRepository(StudentPayment)
    private readonly studentPaymentRepository: Repository<StudentPayment>,
  ) {
    super(studentPaymentRepository);
  }

  async getByCorte() {
    const pagos = await this.studentPaymentRepository.find({
      where: {
        corte: IsNull()
      },
      relations: ['corte']
    })
    return pagos
  }
}
