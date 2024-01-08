import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { Payroll } from './payroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PayrrollService extends GenericService<Payroll> {
  constructor(
    @InjectRepository(Payroll) private payrollRepository: Repository<Payroll>,
  ) {
    super(payrollRepository);
  }
}
