import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';

@Entity('students')
export class Studetns extends GenericEntity {
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

  // enum status

  // one to one relation
  @Column()
  direction: string;

  // OneToMany
  @Column()
  paretns: string;
}
