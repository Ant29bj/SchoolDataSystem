import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

@Entity('teachers')
export class TeachersEntity extends GenericEntity {
  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 10 })
  phone: string;

  // relacion con tabla direccion
  @Column()
  direccion: string;

  // Relacion OneToMany con grupos
  @Column()
  grupos: string;
}
