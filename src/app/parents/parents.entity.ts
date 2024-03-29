import { Column, Entity, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentsEntity } from '../students/students.entity'; // Importa la entidad StudentsEntity
import { DirectionsEntity } from '../directions/directions.entity';

@Entity('parents')
export class ParentsEntity extends GenericEntity {
  @Column({ length: 21 })
  firstName: string;

  @Column({ length: 21 })
  lastName: string;

  @Column({length:10})
  phone: string

  @Column({length:70})
  address: string

  @Column()
  email: string;

  @OneToMany(() => StudentsEntity, student => student.parents)
  protegido: StudentsEntity[];
 
}
