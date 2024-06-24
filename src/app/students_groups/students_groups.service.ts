import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';
import { StudentsGroupsEntity } from './students_groups.entity';
import { StudentsEntity } from '../students/students.entity';
import { GroupsEntity } from '../groups/groups.entity';
@Injectable()
export class StudentsGroupsService{
    constructor(
        @InjectRepository(StudentsGroupsEntity)
        private readonly studentGroupsRepository: Repository<StudentsGroupsEntity>,
    
        @InjectRepository(StudentsEntity)
        private readonly studentRepository: Repository<StudentsEntity>,
    
        @InjectRepository(GroupsEntity)
        private readonly groupRepository: Repository<GroupsEntity>,
      ) {}
    async setStudentGrade(student_id: number, group_id: number, grade: number | null): Promise<StudentsGroupsEntity> {
        const student = await this.studentRepository.findOne({ where: { id: student_id } });
        const group = await this.groupRepository.findOne({ where: { id: group_id } });
    
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
            studentGroup = new StudentsGroupsEntity();
            studentGroup.student = student;
            studentGroup.group = group;
        }
    
        if (grade !== null && grade !== undefined) {
            studentGroup.grade = grade;
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

}
