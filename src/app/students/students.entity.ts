import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  ManyToOne,
  ManyToMany
} from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { ParentsEntity } from '../parents/parents.entity'; // Importa la entidad ParentsEntity
import { GroupsEntity } from '../groups/groups.entity';
import { StudentPayment } from '../students-payment/student-payment.entity';
import { GradeEntity } from '../grades/grades.entity';
import { StudentsGroupsEntity } from '../students_groups/students_groups.entity';

export enum Status {
  Abono = 'Abono',
  Debe = 'Debe',
  NoDebe = 'No debe',
  Adelantado = 'Pago por adelantado',
  Proximo = 'Proximo a pagar',
}

const MENSUALIDAD_IMPORTE = 760;
const INSCRIPCION_IMPORT = 1700;

@Entity('students')
export class StudentsEntity extends GenericEntity {
  @Column()
  firstName: string;

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

  @Column({ default: 0 })
  multas: number;

  @Column()
  email: string;

  @Column({ default: false })
  aumentos: boolean;

  @Column()
  birthDay: Date;

  @OneToMany(() => GradeEntity, (grade) => grade.student)
  calificaciones: GradeEntity[];

  @Column({ default: 0 })
  sobrePago: number;

  @Column({ default: INSCRIPCION_IMPORT })
  inscripcion: number;

  @Column({ type: 'money', default: MENSUALIDAD_IMPORTE })
  debt: number;

  @Column()
  paymentDate: Date;

  @Column({ nullable: true, default: Status.Debe })
  status: Status;

  @ManyToOne(() => ParentsEntity, (parent) => parent.protegido)
  @JoinColumn()
  parents: ParentsEntity;

  @OneToMany(() => StudentsGroupsEntity, studentGroups => studentGroups.student)
  studentGroups: StudentsGroupsEntity[];

  @OneToMany(() => StudentPayment, (payment) => payment.student)
  payments: StudentPayment[];
}
