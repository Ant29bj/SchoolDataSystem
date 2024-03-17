import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { GradeEntity } from './grades.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';

@Injectable()
export class GradesService extends GenericService<GradeEntity> {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    private readonly studentService: StudentsService,
  ) {
    super(gradeRepository);
  }

  async setStudentGrade(studnetId: number, grade: number) {
    const student = await this.studentService.findGroup(studnetId);
    let newGrade = new GradeEntity();
    newGrade.assigment = student.group;
    newGrade.nombreMateria = student.group.modulo;
    newGrade.student = student;
    newGrade.grade = grade;
    console.log(newGrade);

    return await this.gradeRepository.save(newGrade);
  }

  async getGradesByStudent(studentId: number) {
    const calificaciones = await this.gradeRepository.find({
      where: {
        student: {
          id: studentId,
        },
      },
      relations: ['student.group.teacher'],
    });

    return calificaciones;
  }
}
