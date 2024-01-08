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

  findLike(cadena: string) {
    return (
      this.teachersRepository
        .createQueryBuilder('teacher')
        .where('teacher.firstName ILIKE :cadena', { cadena: `%${cadena}%` })
        .orWhere('teacher.lastName ILIKE :cadena', { cadena: `%${cadena}%` })
        // Agrega más campos según sea necesario
        .getMany()
    );
  }
}
