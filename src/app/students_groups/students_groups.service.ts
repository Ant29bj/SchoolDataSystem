import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';
import { StudentsGroupsEntity } from './students_groups.entity';
import { StudentsEntity } from '../students/students.entity';
import { GroupsEntity } from '../groups/groups.entity';
import { TransformarDeuda } from '../students/utlis/transform-type-money';

@Injectable()
export class StudentsGroupsService{
    constructor(
        @InjectRepository(StudentsGroupsEntity)
        private readonly studentGroupsRepository: Repository<StudentsGroupsEntity>,
    
        @InjectRepository(StudentsEntity)
        private readonly studentRepository: Repository<StudentsEntity>,
    
        @InjectRepository(GroupsEntity)
        private readonly groupRepository: Repository<GroupsEntity>,

        private studentsService: StudentsService
      ) {}
    async mergeGroup(group_stay: number, group_delete: number): Promise<StudentsGroupsEntity> {
        const group_1 = await this.getGroupByid(group_stay);
        const studentsToMove = await this.getStudentsGroupsByGroup(group_delete);
        for (const studentGroup of studentsToMove) {
            studentGroup.group = group_1;
            await this.studentGroupsRepository.save(studentGroup);
        }
        const group = await this.groupRepository.delete(group_delete);
        return
    }
    async setStudentGrade(student_id: number, group_id: number, basic_grade: number | null, inter_grade: number | null, inter_advanced_grade: number | null, advanced_grade: number | null, inscripcion: number | null, mensualidad: number | null): Promise<StudentsGroupsEntity> {
        const student = await this.studentRepository.findOne({ where: { id: student_id } });
        const group = await this.groupRepository.findOne({ where: { id: group_id }, relations: ['carrera'] });
    
        if (!student || !group) {
            throw new Error('Student or group not found');
        }
    
        let studentGroup = await this.studentGroupsRepository.findOne({
            where: {
                student: { id: student_id },
                group: { id: group_id }
            }
        });
        

        if (!studentGroup) {
            let inscripcion_student = TransformarDeuda(student.inscripcion) + inscripcion;
            let deuda = TransformarDeuda(student.debt) + mensualidad;
            student.inscripcion = inscripcion_student;
            student.debt = deuda;
            const student_updated = await this.studentsService.update(student_id, student);
            studentGroup = new StudentsGroupsEntity();
            studentGroup.group = group;
        }
        if (inscripcion !== null && inscripcion !== undefined) {
            studentGroup.inscripcion = inscripcion;
        }
        if (mensualidad !== null && mensualidad !== undefined) {
            studentGroup.mensualidad = mensualidad;
        }
        if (basic_grade !== null && basic_grade !== undefined) {
            studentGroup.basic_grade = basic_grade;
        }
        if (inter_grade !== null && inter_grade !== undefined) {
            studentGroup.inter_grade = inter_grade;
        }
        if (inter_advanced_grade !== null && inter_advanced_grade !== undefined) {
            studentGroup.inter_advanced_grade = inter_advanced_grade;
        }
        if (advanced_grade !== null && advanced_grade !== undefined) {
            studentGroup.advanced_grade = advanced_grade;
        }
    
        console.log(studentGroup);
        return await this.studentGroupsRepository.save(studentGroup);
    }

    async getStudentsGroupsByGroup(group_id: number) {
        return await this.studentGroupsRepository.find({
            where: { group: { id: group_id } },
            relations: ['student', 'group'],
        });
    }

    async getStudentsGroupsByStudent(student_id: number) {
        return await this.studentGroupsRepository.find({
            where: { student: { id: student_id } },
            relations: ['student', 'group'],
        });
    }
    async getGroupByid(group_id: number) {
        return await this.groupRepository.findOne({ where: { id: group_id } });
    }

}
