import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { DirectionsEntity } from '../directions/directions.entity';
import { GroupsEntity } from '../groups/groups.entity';

@Entity('teachers')
export class TeachersEntity extends GenericEntity {
  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 10 })
  phone: string;
  /*

  @ManyToOne(() => DirectionsEntity, (direccion) => direccion.id) .
  direccion: DirectionsEntity;
<<<<<<< HEAD
  
  @OneToMany(() => GroupsEntity, (grupo) => grupo.id)
  grupos: GroupsEntity[];
*/


  @OneToMany(() => GroupsEntity, (grupo) => grupo.teacher)
  group: GroupsEntity[];
}