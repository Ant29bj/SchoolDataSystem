import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { GroupsEntity } from '../groups/groups.entity';
import { group } from 'console';

@Entity('students')
export class Studetns extends GenericEntity {
  @Column()
  firstName: string;

>>>>>>> 2c898e8 (tablas creadas falta relaciones)
  @Column()
  lastName: string;

  @Column({ type: 'timestamp' })
  registrationDate: Date;

<<<<<<< HEAD
  @Column({ unique: true })
  matricula?: string;

  @Column({ unique: true, width: 18 })
  curp: string;
=======
  // aun falta definir el formato de la matricula
  @Column()
  matricula: string;
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

  @Column({ length: 10 })
  phone: string;

<<<<<<< HEAD
  @Column({ type: 'money', default: 590 })
=======
  @Column({ type: 'money' })
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
  @Min(590)
  @Max(990)
  amount: number;

  @Column()
  email: string;

  @Column({ default: false })
  aumentos: boolean;

  @Column()
  birthDay: Date;

<<<<<<< HEAD
  @Column({ type: 'float', default: 0 })
=======
  @Column({ type: 'float' })
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
  @Min(0)
  @Max(10)
  grade: number;

<<<<<<< HEAD
  @Column({ type: 'money', default: 590 })
=======
  @Column({ type: 'money' })
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
  debt: number;

  @Column()
  paymentDate: Date;

<<<<<<< HEAD
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
=======
  // enum status

  // one to one relation
  @Column()
  direction: string;

  // OneToMany
  @Column()
  paretns: string;
}
