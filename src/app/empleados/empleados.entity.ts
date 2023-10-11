import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { DirectionsEntity } from '../directions/directions.entity'; 


enum Puesto{
  Admin = 'Admin',
  Maestro = 'Maestro',
  Ventas = 'Ventas',
  Staff = 'Staff'
}
@Entity('empleados')
export class EmpleadosEntity extends GenericEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

   // one to one relation
   @OneToOne(() => DirectionsEntity)
   @JoinColumn()
   direction: DirectionsEntity;

  @Column({ length: 12 })
  rfc: string;

  @Column({length: 10})
  telefono: string;

  @Column()
  puesto: Puesto;

  @Column({ type: 'money' })
  sueldo: number;

  @Column()
  email: string;

}
