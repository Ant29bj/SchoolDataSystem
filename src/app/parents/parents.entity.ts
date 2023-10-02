<<<<<<< HEAD
import { Column, Entity, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentsEntity } from '../students/students.entity'; // Importa la entidad StudentsEntity
import { DirectionsEntity } from '../directions/directions.entity';
=======
import { GenericEntity } from '../generics/generic.entity';
import { Column, Entity } from 'typeorm';
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

@Entity('parents')
export class ParentsEntity extends GenericEntity {
  @Column({ length: 21 })
  firstName: string;

  @Column({ length: 21 })
  lastName: string;

<<<<<<< HEAD
  @Column({length:10})
  phone: string

  @ManyToOne(() => DirectionsEntity, { eager: true })
  @JoinColumn()
  direction: DirectionsEntity;

  @Column()
  email: string;

  @OneToMany(() => StudentsEntity, student => student.parents)
  protegido: StudentsEntity[];
 
=======
  @Column()
  email: string;

  // falta relacionar con estudiantes (es arreglo)
  @Column()
  alumnos: string;
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
}
