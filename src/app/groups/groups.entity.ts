import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';



@Entity('groups')
export class GroupsEntity extends GenericEntity {
  constructor(schedule: string, name: string, teacher: TeachersEntity, day: string) {
    super();
    this.name = name;
    this.day = day;
    this.schedule = schedule;
    this.teacher = teacher;
  }  
  
 

  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

  @Column()
  day: string;
  
  @ManyToOne(() => TeachersEntity, (teacher) => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsEntity, (student) => student.group)
  students: StudentsEntity[];
}
