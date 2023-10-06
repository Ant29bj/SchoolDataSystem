import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
  @Column({ type: 'time' })
  schedule: string;

  // name = teacher + horario agregar función en el servicio
  @Column()
  name: string;

  @ManyToOne(() => TeachersEntity, teacher => teacher.id)
  teacher: TeachersEntity;

  @OneToMany(() => StudentsEntity, student => student.id)
  students: StudentsEntity[];
}
