import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentsModule } from './app/parents/parents.module';
import { DirectionsModule } from './app/directions/directions.module';
import { TeachersModule } from './app/teachers/teachers.module';
import { GroupsModule } from './app/groups/groups.module';
import { StudentsModule } from './app/students/students.module';
import { UsersModule } from './app/users/users.module';
import { EmpleadosModule } from './app/empleados/empleados.module';
import { PayrollMoudle } from './app/payroll/payroll.module';
import { StudentPaymentModule } from './app/students-payment/student-payment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CorteModule } from './app/corte/corte.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfigAsync } from './app/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ParentsModule,
    DirectionsModule,
    GroupsModule,
    StudentsModule,
    TeachersModule,
    UsersModule,
    EmpleadosModule,
    PayrollMoudle,
    StudentPaymentModule,
    CorteModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
