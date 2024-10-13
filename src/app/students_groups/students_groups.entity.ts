import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupsEntity } from '../groups/groups.entity';
import { Max, Min } from 'class-validator';
import { StudentsEntity } from '../students/students.entity';
import { GenericEntity } from '../generics/generic.entity';

@Entity('students-groups')
export class StudentsGroupsEntity extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Min(0)
  @Max(10)
  @Column({ nullable: true })
  basic_grade: number;

  @Min(0)
  @Max(10)
  @Column({ nullable: true })
  inter_grade: number;

  @Min(0)
  @Max(10)
  @Column({ nullable: true })
  inter_advanced_grade: number;

  @Min(0)
  @Max(10)
  @Column({ nullable: true })
  advanced_grade: number;

  @ManyToOne(() => StudentsEntity, student => student.studentGroups)
  student: StudentsEntity;

  @ManyToOne(() => GroupsEntity, group => group.studentGroups)
  group: GroupsEntity;

  @Column({ default: 0 })
    inscripcion: number;
  
  @Column({ default: 0 })
    mensualidad: number;
}