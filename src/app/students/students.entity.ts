import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { ParentsEntity } from '../parents/parents.entity'; // Importa la entidad ParentsEntity

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

  @Column()
  multa: false;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp' })
  registrationDate: Date;

  @Column()
  matricula: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ type: 'money' })
  @Min(590)
  @Max(990)
  amount: number;

  @Column()
  email: string;

  @Column({ default: false })
  aumentos: boolean;

  @Column()
  birthDay: Date;

  @Column({ type: 'float' })
  @Min(0)
  @Max(10)
  grade: number;

  @Column({ type: 'money' })
  debt: number;

  @Column()
  paymentDate: Date;

  @Column({ nullable: true })
  status: Status;

  /*@OneToOne(() => DirectionsEntity, direction => direction.student)
  @JoinColumn()
  direction: DirectionsEntity;
*/
  @OneToOne(() => ParentsEntity, (parent) => parent.protegido)
  @JoinColumn()
  parents: ParentsEntity;
}
