import { Column, Entity, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentsEntity } from '../students/students.entity'; // Importa la entidad StudentsEntity
import { DirectionsEntity } from '../directions/directions.entity';

@Entity('parents')
export class ParentsEntity extends GenericEntity {
  @Column({nullable: true,  length: 21 })
  firstName: string;

  @Column({nullable: true,  length: 21 })
  lastName: string;

  @Column({nullable: true, length:10})
  phone: string

  @Column({nullable: true, length:255})
  address: string

  @Column({nullable: true})
  email: string;

  @OneToMany(() => StudentsEntity, student => student.parents)
  protegido: StudentsEntity;
  
 
}
