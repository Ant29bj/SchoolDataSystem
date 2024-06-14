import { Column, Entity, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';
import { GradeEntity } from '../grades/grades.entity';
import { StudentsGroupsEntity } from '../students_groups/students_groups.entity';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
  constructor(
    schedule: string,
    name: string,
    teacher: TeachersEntity,
    modulo: string,
    day: string,
  ) {
    super();
    this.name = name;
    this.day = day;
    this.schedule = schedule;
    this.teacher = teacher;
    this.modulo = modulo;
  }

  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

  @Column()
  day: string;

  @Column({ nullable: true })
  modulo: string;

  @ManyToOne(() => TeachersEntity, (teacher) => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsGroupsEntity, studentGroups => studentGroups.group)
  studentGroups: StudentsGroupsEntity[];

  @OneToMany(() => GradeEntity, (grade) => grade.assigment)
  grades: GradeEntity[];
}
