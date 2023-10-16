import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PayrrollService } from './payroll.service';
import { Payroll } from './payroll.entity';
import { GenericController } from '../generics/generic.controller';


@Controller('payroll')
export class PayrollController extends GenericController<Payroll, PayrrollService> {
  constructor(private readonly payrollService: PayrrollService) {
    super(payrollService);

  }

}