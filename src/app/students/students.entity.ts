import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { ParentsEntity } from '../parents/parents.entity'; // Importa la entidad ParentsEntity
import { GroupsEntity } from '../groups/groups.entity';

export enum Status {
  Abono = 'Abono',
  Debe = 'Debe',
  NoDebe = 'No debe',
  Adelantado = 'Pago por adelantado',
  Proximo = 'Proximo a pagar',
}

@Entity('students')
export class StudentsEntity extends GenericEntity {
  @Column()
  firstName: string;

  @Column({ default: false })
  multa: boolean;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp' })
  registrationDate: Date;

  @Column({ unique: true })
  matricula?: string;

  @Column({ unique: true, width: 18 })
  curp: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ type: 'money', default: 590 })
  @Min(590)
  @Max(990)
  amount: number;

  @Column()
  email: string;

  @Column({ default: false })
  aumentos: boolean;

  @Column()
  birthDay: Date;

  @Column({ type: 'float', default: 0 })
  @Min(0)
  @Max(10)
  grade: number;

  @Column({ type: 'money', default: 1700 })
  debt: number;

  @Column()
  paymentDate: Date;

  @Column({ nullable: true, default: Status.Debe })
  status: Status;

  /*@OneToOne(() => DirectionsEntity, direction => direction.student)
  @JoinColumn()
  direction: DirectionsEntity;
*/
  @OneToOne(() => ParentsEntity, (parent) => parent.protegido)
  @JoinColumn()
  parents: ParentsEntity;

  @ManyToOne(() => GroupsEntity, (group) => group.students)
  group: GroupsEntity;
}
