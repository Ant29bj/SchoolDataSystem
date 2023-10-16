import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { TeachersEntity } from '../teachers/teachers.entity';
import { StudentsEntity } from '../students/students.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Entity('groups')
export class GroupsEntity extends GenericEntity {
 constructor (group:CreateGroupDto){
  super();
  if (group){
    this.schedule = group.schedule
    this.name = group.name
  }
 }
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
