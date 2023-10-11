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
    return this.studentsRepository.findOne({ where: { id } });
  }

  async create(student: StudentsEntity): Promise<StudentsEntity> {
    // Generar matrícula
    const matricula = this.generateMatricula(student);
    student.matricula = matricula;

    const newStudent = this.studentsRepository.create(student);
    return await this.studentsRepository.save(newStudent);
  }

  async update(id: number, student: StudentsEntity): Promise<StudentsEntity> {
    await this.studentsRepository.update(id, student);
    return await this.studentsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.studentsRepository.delete(id);
  }

  // Función para generar la matrícula
  private generateMatricula(student: StudentsEntity): string {
    const createdYear = student.createAt.getFullYear().toString().slice(-2);
    const birthYear = student.birthDay.getFullYear().toString().slice(-2);
    const createdMonth = (student.createAt.getMonth() + 1).toString().padStart(2, '0');
    const birthMonth = (student.birthDay.getMonth() + 1).toString().padStart(2, '0');
    const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');

    const matricula = `${createdMonth}${createdYear}${birthMonth}${birthYear}${randomDigits}`;
    return matricula;
  }
}
