import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PayrrollService } from './payroll.service';
import { Payroll } from './payroll.entity';
import { GenericController } from '../generics/generic.controller';
import { InsertResult } from 'typeorm';
import { CreatePayrollDto } from './dto/create-payroll.dto';

@Controller('payroll')
export class PayrollController extends GenericController<Payroll, PayrrollService> {
  constructor(private readonly payrollService: PayrrollService) {
    super(payrollService);
  }   
  @Post()
  async create(@Body() createPayrollDto: CreatePayrollDto) {
    const payroll = new Payroll();


    return this.payrollService.create(payroll);
  }
}