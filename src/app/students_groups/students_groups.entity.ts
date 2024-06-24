import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupsEntity } from '../groups/groups.entity';
import { Max, Min } from 'class-validator';
import { StudentsEntity } from '../students/students.entity';

@Entity()
export class StudentsGroupsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Min(0)
  @Max(10)
  @Column()
  grade: number;

  @ManyToOne(() => StudentsEntity, student => student.studentGroups)
  student: StudentsEntity;

  @ManyToOne(() => GroupsEntity, group => group.studentGroups)
  group: GroupsEntity;
}