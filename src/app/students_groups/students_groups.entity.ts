import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupsEntity } from '../groups/groups.entity';
import { StudentsEntity } from '../students/students.entity';

@Entity()
export class StudentsGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudentsEntity, student => student.studentGroups)
  student: StudentsEntity;

  @ManyToOne(() => GroupsEntity, group => group.studentGroups)
  group: GroupsEntity;
}