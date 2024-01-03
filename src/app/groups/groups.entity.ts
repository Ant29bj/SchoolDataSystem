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


@Entity('groups')
export class GroupsEntity extends GenericEntity {
  constructor(schedule: string, name: string, teacher: TeachersEntity) {
    super();
    this.name = name;
    this.schedule = schedule;
    this.teacher = teacher;
  }
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
