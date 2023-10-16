import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { ParentsEntity } from '../parents/parents.entity';
import { StudentsEntity } from '../students/students.entity';

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

  /*@OneToOne(() => ParentsEntity, parent => parent.direction)
  @JoinColumn()
  parent: ParentsEntity;

  @OneToOne(() => StudentsEntity, student => student.direction)
  @JoinColumn()
  student: StudentsEntity;*/
}
