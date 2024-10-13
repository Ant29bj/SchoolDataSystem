import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentsEntity } from '../students/students.entity';
import { CorteEntity } from '../corte/corte.entity';

export enum ConceptoPago {
  ABONO_MENSUAL = 'Pago mensual',
  ADELANTO = 'Adelanto',
  LIQUIDACION = 'Liquidacion',
  INSCRIPCION = 'Inscripcion',
}

@Entity('pagos')
export class StudentPayment extends GenericEntity {
  @Column()
  nombreCliente: string;

  @Column({})
  importe: number;

  @Column({})
  concepto: ConceptoPago;

  @Column()
  carrera: string;

  @Column({ nullable: true })
  proximoPago: Date;

  @ManyToOne(() => StudentsEntity, (student) => student.payments)
  student: StudentsEntity;

  @ManyToOne(() => CorteEntity, (corte) => corte.pagos, { nullable: true })
  corte: CorteEntity;
}
