import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { ParentsEntity } from '../parents/parents.entity'; // Importa la entidad ParentsEntity
import { DirectionsEntity } from '../directions/directions.entity'; // Importa la entidad ParentsEntity


enum Status{
  Debe = 'Debe',
  NoDebe = 'No debe',
  Adelantado = 'Pago por adelantado',
  Proximo = 'Proximo a pagar'
}
@Entity('students')
export class StudentsEntity extends GenericEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp' })
  registrationDate: Date;

  // aun falta definir el formato de la matricula
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

  @Column()
  status: Status;

  // one to one relation
  @OneToOne(() => DirectionsEntity)
  @JoinColumn()
  direction: DirectionsEntity;

  // OneToMany
  @OneToMany(() => ParentsEntity, parents => parents.alumnos)
  parents: ParentsEntity;
}
