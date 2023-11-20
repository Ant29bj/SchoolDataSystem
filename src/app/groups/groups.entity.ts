import { Column } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import {Studetns} from '../students/students.entity';

export class GroupsEntity extends GenericEntity {
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

<<<<<<< HEAD
  @ManyToOne(() => TeachersEntity, (teacher) => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsEntity, (student) => student.group)
  students: StudentsEntity[];
=======
  // relacion ManyToOne
  @Column()
  teacher: string;

  // relacion OneToMany;
  @Column()
  students: string;
}
