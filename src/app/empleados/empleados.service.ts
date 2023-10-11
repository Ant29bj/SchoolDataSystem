import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpleadosEntity } from './empleados.entity';
import { GenericService } from '../generics/generic.service';

@Injectable()
export class EmpleadosService extends GenericService<EmpleadosEntity> {

}