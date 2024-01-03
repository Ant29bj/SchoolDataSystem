import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import {StudentsEntity, /*Studetns*/} from '../students/students.entity';
import { TeachersEntity } from '../teachers/teachers.entity';

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
function ManyToOne(arg0: () => typeof TeachersEntity, arg1: (teacher: any) => any): (target: GroupsEntity, propertyKey: "teacher") => void {
  throw new Error('Function not implemented.');
}

function OneToMany(arg0: () => typeof StudentsEntity, arg1: (student: any) => any): (target: GroupsEntity, propertyKey: "students") => void {
  throw new Error('Function not implemented.');
}

