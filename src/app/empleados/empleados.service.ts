import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions} from 'typeorm';
import { EmpleadosEntity } from './empleados.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { GenericService } from '../generics/generic.service';

@Injectable()
export class EmpleadosService extends GenericService<EmpleadosEntity>{
  constructor(
    @InjectRepository(EmpleadosEntity)
    private readonly empleadosRepository: Repository<EmpleadosEntity>,
  ) {super(empleadosRepository)}
}