import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , FindOneOptions} from 'typeorm';
import { EmpleadosEntity } from './empleados.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(EmpleadosEntity)
    private readonly empleadosRepository: Repository<EmpleadosEntity>,
  ) {}

  findAll(): Promise<EmpleadosEntity[]> {
    return this.empleadosRepository.find();
  }

  findOne(id: number): Promise<EmpleadosEntity> {
    return this.empleadosRepository.findOne({where: {id}});
  }

  async create(empleado: CreateEmpleadoDto): Promise<EmpleadosEntity> {
    const newEmpleado = this.empleadosRepository.create(empleado);
    return this.empleadosRepository.save(newEmpleado);
  }

  async update(id: number, empleado: EmpleadosEntity): Promise<EmpleadosEntity> {
    await this.empleadosRepository.update(id, empleado);
    return this.empleadosRepository.findOne({where: {id}});
  }

  async remove(id: string): Promise<void> {
    await this.empleadosRepository.delete(id);
  }
}