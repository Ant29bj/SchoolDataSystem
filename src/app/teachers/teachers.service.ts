import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersEntity } from './teachers.entity';
import { GenericService } from '../generics/generic.service';

@Injectable()
export class TeachersService extends GenericService<TeachersEntity> {
  constructor(
    @InjectRepository(TeachersEntity)
    private readonly teachersRepository: Repository<TeachersEntity>,
  ) {
    super(teachersRepository);
  }
}
