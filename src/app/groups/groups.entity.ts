import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import {Studetns} from '../students/students.entity';

@Entity()
export class GroupsEntity extends GenericEntity {

  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;


  @ManyToOne(() => TeachersEntity, (teacher) => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsEntity, (student) => student.group)
  students: StudentsEntity[];


}
