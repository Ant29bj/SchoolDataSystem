import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorteEntity } from './corte.entity';
import { CorteService } from './corte.service';
import { CorteController } from './corte.controller';
import { StudentPaymentModule } from '../students-payment/student-payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([CorteEntity]), StudentPaymentModule],
  controllers: [CorteController],
  providers: [CorteService],
})
export class CorteModule {}
