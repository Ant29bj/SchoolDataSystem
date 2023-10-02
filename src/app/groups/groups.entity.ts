import { Column } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

export class GroupsEntity extends GenericEntity {
  @Column({ type: 'time' })
  schedule: string;
  // name = teacher + horario agregar funcion en el servicio
  @Column()
  name: string;

  // relacion ManyToOne
  @Column()
  teacher: string;

  // relacion OneToMany;
  @Column()
  students: string;
}
