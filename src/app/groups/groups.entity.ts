import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { share } from 'rxjs';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
  constructor(schedule: string, name: string, teacher: TeachersEntity) {
    super();
    this.name = name;
    this.schedule = schedule;
    this.teacher = teacher;
  }
=======
import { Column } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

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
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
}
