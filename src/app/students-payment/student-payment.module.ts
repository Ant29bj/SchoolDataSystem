import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentPayment } from './student-payment.entity';
import { StudentPaymentService } from './student-payment.service';
import { StudentPaymentController } from './student-payment.controller';
import { StudentsModule } from '../students/students.module';
import { StudentsGroupsModule } from '../students_groups/students_groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentPayment]), StudentsModule],
  controllers: [StudentPaymentController],
  providers: [StudentPaymentService],
  exports: [StudentPaymentService],
})
export class StudentPaymentModule {}
