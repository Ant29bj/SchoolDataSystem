import { Column, Entity, ManyToOne, OneToMany,  } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import {StudentsEntity} from '../students/students.entity';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

  // relacion ManyToOne
  @Column()
  teacher: string;

  // relacion OneToMany;
  @OneToMany(() => StudentsEntity, students => students.group)
  students: StudentsEntity[];


 
}
