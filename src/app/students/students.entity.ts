import { Column, Entity } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { Max, Min } from 'class-validator';
import { GroupsEntity } from '../groups/groups.entity';
import { group } from 'console';
import { ParentsEntity } from '../parents/parents.entity';

@Entity('students')
export class Studetns extends GenericEntity {
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

  @Column({ type: 'money', default: 590 })
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

  // enum status

  // one to one relation
}
function OneToOne(arg0: () => any, arg1: (parent: any) => any): (target: Studetns, propertyKey: "parents") => void {
  throw new Error('Function not implemented.');
}

function JoinColumn(): (target: Studetns, propertyKey: "parents") => void {
  throw new Error('Function not implemented.');
}

function ManyToOne(arg0: () => typeof GroupsEntity, arg1: (group: any) => any): (target: Studetns, propertyKey: "group") => void {
  throw new Error('Function not implemented.');
}

