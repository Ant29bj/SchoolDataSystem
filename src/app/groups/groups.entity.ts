import { Column, Entity, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';
import { StudentsGroupsEntity } from '../students_groups/students_groups.entity';
import { CareersEntity } from '../careers/careers.entity';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
  constructor(
    schedule: string,
    name: string,
    teacher: TeachersEntity,
    carrera: CareersEntity,
    day: string,
  ) {
    super();
    this.name = name;
    this.day = day;
    this.schedule = schedule;
    this.teacher = teacher;
    this.carrera = carrera;
  }

  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

  @Column()
  day: string;

  @ManyToOne(() => CareersEntity)
  carrera: CareersEntity;

  @ManyToOne(() => TeachersEntity, (teacher) => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsGroupsEntity, studentGroups => studentGroups.group)
  studentGroups: StudentsGroupsEntity;

}
