import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionsController } from './app/directions/directions.controller';
import { ParentsController } from './app/parents/parents.controller';
import { TeachersController } from './app/teachers/teachers.controller';
import { GroupsController } from './app/groups/groups.controller';
import { StudentsController } from './app/students/students.controller';
import { PayrollMoudle } from './app/payroll/payroll.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'root',
      password: 'root',
      database: 'root',
      host: 'localhost',
      port: 5432,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    DirectionsController,
    ParentsController,
    TeachersController,
    GroupsController,
    StudentsController,
    PayrollMoudle,
  ],
  providers: [AppService],
})
export class AppModule {}
