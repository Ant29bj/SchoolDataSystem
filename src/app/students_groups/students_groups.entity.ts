import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupsEntity } from '../groups/groups.entity';
import { Max, Min } from 'class-validator';
import { StudentsEntity } from '../students/students.entity';
import { GenericEntity } from '../generics/generic.entity';

@Entity()
export class StudentsGroupsEntity extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Min(0)
  @Max(10)
  @Column({ nullable: true })
  grade: number;

  @ManyToOne(() => StudentsEntity, student => student.studentGroups)
  student: StudentsEntity;

  @ManyToOne(() => GroupsEntity, group => group.studentGroups)
  group: GroupsEntity;
}