import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleadosEntity } from './empleados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleadosEntity])],
  controllers: [EmpleadosController],
  providers: [EmpleadosService]
})
export class EmpleadosModule {}