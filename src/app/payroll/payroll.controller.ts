import { Controller, Get } from '@nestjs/common';
import { PayrrollService } from './generi.service';

@Controller('Payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrrollService) {}

  @Get()
  getPayrolls() {
    return this.payrollService.find();
  }
}
