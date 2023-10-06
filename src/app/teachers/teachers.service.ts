import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersEntity } from './teachers.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(TeachersEntity)
    private readonly teachersRepository: Repository<TeachersEntity>,
  ) {}

  findAll(): Promise<TeachersEntity[]> {
    return this.teachersRepository.find();
  }

  findOne(id: number): Promise<TeachersEntity> {
    return this.teachersRepository.findOne({where: {id} });
  }

  async create(teacher: TeachersEntity): Promise<TeachersEntity> {
    const newTeacher = this.teachersRepository.create(teacher);
    return await this.teachersRepository.save(newTeacher);
  }

  async update(id: number, teacher: TeachersEntity): Promise<TeachersEntity> {
    await this.teachersRepository.update(id, teacher);
    return await this.teachersRepository.findOne({where: {id} });
  }

  async remove(id: string): Promise<void> {
    await this.teachersRepository.delete(id);
  }
}
