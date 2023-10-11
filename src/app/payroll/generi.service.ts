import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { Payroll } from './payroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PayrrollService extends GenericService<Payroll> {
  constructor(
    @InjectRepository(Payroll) private payrollRepository: Repository<Payroll>,
  ) {
    super(payrollRepository);
  }
}
