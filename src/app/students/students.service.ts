import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from './students.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  findAll(): Promise<StudentsEntity[]> {
    return this.studentsRepository.find();
  }

  findOne(id: number): Promise<StudentsEntity> {
    return this.studentsRepository.findOne({where: {id} });
  }

  async create(student: StudentsEntity): Promise<StudentsEntity> {
    const newStudent = this.studentsRepository.create(student);
    return await this.studentsRepository.save(newStudent);
  }

  async update(id: number, student: StudentsEntity): Promise<StudentsEntity> {
    await this.studentsRepository.update(id, student);
    return await this.studentsRepository.findOne({where: {id} });
  }

  async remove(id: string): Promise<void> {
    await this.studentsRepository.delete(id);
  }
}
