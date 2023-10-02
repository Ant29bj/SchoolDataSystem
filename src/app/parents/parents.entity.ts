import { GenericEntity } from '../generics/generic.entity';
import { Column, Entity } from 'typeorm';

@Entity('parents')
export class ParentsEntity extends GenericEntity {
  @Column({ length: 21 })
  firstName: string;

  @Column({ length: 21 })
  lastName: string;

  @Column()
  email: string;

  // falta relacionar con estudiantes (es arreglo)
  @Column()
  alumnos: string;
}
