import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

@Entity('directions')
export class DirectionsEntity extends GenericEntity {
  @Column()
  addressLine1: string;

  @Column()
  addressLine2: string;

  @Column({ length: 5 })
  postalCode: string;

  @Column()
  providence: string;

  @Column({ nullable: true })
  intNumber?: string;

  @Column()
  extNumber: string;
}
