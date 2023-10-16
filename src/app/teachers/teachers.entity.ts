import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
<<<<<<< HEAD
//import { DirectionsEntity } from '../directions/directions.entity';
import { GroupsEntity } from '../groups/groups.entity';

@Entity('teachers')
export class TeachersEntity extends GenericEntity {
=======
import { DirectionsEntity } from '../directions/directions.entity';
import { GroupsEntity } from '../groups/groups.entity'; 

@Entity('teachers')
export class TeachersEntity extends GenericEntity {
  
>>>>>>> 49dccb609018a680354887600ba48df816a5a912
  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 10 })
  phone: string;
  /*

  @ManyToOne(() => DirectionsEntity, (direccion) => direccion.id)
  direccion: DirectionsEntity;
<<<<<<< HEAD
  
  @OneToMany(() => GroupsEntity, (grupo) => grupo.id)
  grupos: GroupsEntity[];
*/
=======

  @OneToMany(() => GroupsEntity, (grupo) => grupo.id)
  grupos: GroupsEntity[]; 
>>>>>>> 49dccb609018a680354887600ba48df816a5a912
}
