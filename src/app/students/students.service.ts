import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  findAll(): Promise<StudentsEntity[]> {
    return this.studentsRepository.find();
  }

  findOne(matricula: string): Promise<StudentsEntity> {
    return this.studentsRepository.findOne({ where: { matricula } });
  }

  async create(student: CreateStudentDto): Promise<StudentsEntity> {
    const newStudent = new StudentsEntity(student);
    newStudent.registrationDate = new Date();
    newStudent.createAt = new Date();
    newStudent.matricula = this.generateMatricula(newStudent);

    const savedStudent = await this.studentsRepository.save(newStudent);
    return savedStudent;
  }

  async update(matricula: string, student: StudentsEntity): Promise<StudentsEntity> {
    await this.studentsRepository.update(matricula, student);
    return await this.studentsRepository.findOne({ where: { matricula } });
  }

  async remove(matricula: string): Promise<void> {
    await this.studentsRepository.delete(matricula);
  }


  private generateMatricula(student: StudentsEntity): string {
    const createdYear = student.registrationDate.getFullYear().toString().slice(-2);
    console.log(createdYear)
    console.log('ojito')
    const birthYear = student.birthDay.getFullYear().toString().slice(-2);
    const createdMonth = (student.createAt.getMonth() + 1).toString().padStart(2, '0');
    const birthMonth = (student.birthDay.getMonth() + 1).toString().padStart(2, '0');
    const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');

    const matricula = `${createdYear}${createdMonth}${birthYear}${birthMonth}${randomDigits}`;
    return matricula;
    }
}
