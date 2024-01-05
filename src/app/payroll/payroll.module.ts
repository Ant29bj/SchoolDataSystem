import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrrollService } from './payroll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll])],
  controllers: [PayrollController],
  providers: [PayrrollService],
})
export class PayrollMoudle {}