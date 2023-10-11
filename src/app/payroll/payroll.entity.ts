import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

@Entity('payroll')
export class Payroll extends GenericEntity {
  // se debe de relacionar con un a tabla de empleados (o se debe de relacionar con usuarios aun no se sabe)
  @Column()
  emmitedFor: string;

  @Column()
  worker: string;

  @Column({ type: 'money' })
  payroll: number;
}
