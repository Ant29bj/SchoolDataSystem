import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PayrrollService } from './payroll.service';
import { Payroll } from './payroll.entity';
import { GenericController } from '../generics/generic.controller';
import { ApiBody } from '@nestjs/swagger';
import { CreatePayroll } from './dto/payroll.dto';

@Controller('payroll')
export class PayrollController extends GenericController<
  Payroll,
  PayrrollService
> {
  constructor(private readonly payrollService: PayrrollService) {
    super(payrollService);
  }

  @ApiBody({ type: CreatePayroll, required: true })
  @Post()
  override async create(@Body() entity: Payroll) {
    return this.payrollService.create(entity);
  }
}
