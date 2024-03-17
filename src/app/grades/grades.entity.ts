import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { GroupsEntity } from '../groups/groups.entity';
import { StudentsEntity } from '../students/students.entity';

@Entity('grades')
export class GradeEntity extends GenericEntity {
  @Min(0)
  @Max(10)
  @Column()
  grade: number;

  @Column()
  nombreMateria: string;

  @ManyToOne(() => GroupsEntity, (group) => group.id, { nullable: false })
  assigment: GroupsEntity;

  @ManyToOne(() => StudentsEntity, (student) => student.calificaciones, {})
  student: StudentsEntity;
}
