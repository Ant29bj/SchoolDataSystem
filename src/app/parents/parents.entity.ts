import { Column, Entity, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentsEntity } from '../students/students.entity'; // Importa la entidad StudentsEntity

@Entity('parents')
export class ParentsEntity extends GenericEntity {
  @Column({ length: 21 })
  firstName: string;

  @Column({ length: 21 })
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => StudentsEntity, student => student.parents)
  alumnos: StudentsEntity[];
 
}
