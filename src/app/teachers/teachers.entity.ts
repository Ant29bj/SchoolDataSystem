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

  @Column({ nullable: true })
  direccion: string;

  @OneToMany(() => GroupsEntity, (grupo) => grupo.teacher)
  group: GroupsEntity[];
}
