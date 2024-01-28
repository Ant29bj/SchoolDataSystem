import { Column, Entity, Generated, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { StudentPayment } from '../students-payment/student-payment.entity';

@Entity('cortes')
export class CorteEntity extends GenericEntity {

  @Column({})
  @Generated("uuid")
  folio: string

  @Column()
  fechaCorte: Date

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subTotal: number;

  @Column({
    nullable: true,
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  tarifaIva: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number

  @OneToMany(() => StudentPayment, (studentPayment) => studentPayment.corte)
  pagos: StudentPayment[]
}
