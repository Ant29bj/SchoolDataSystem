import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';
import { DirectionsEntity } from '../directions/directions.entity'; 
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { CreateDirectionDto } from '../directions/dto/create-direction.dto';
export enum Puesto{
  Admin = 'Admin',
  Maestro = 'Maestro',
  Ventas = 'Ventas',
  Staff = 'Staff'
}
@Entity('empleados')
export class EmpleadosEntity extends GenericEntity {
  constructor (empleado:CreateEmpleadoDto){
    
    super();
    if (empleado) {
      this.firstName = empleado.firstName
      this.lastName = empleado.lastName
      this.phone = empleado.phone
      this.rfc = empleado.rfc
      this.email = empleado.email
      this.sueldo = empleado.sueldo
      this.email = empleado.email
      this.direction = empleado.direction //|| new DirectionsEntity();
    }
  }

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
  phone: string;

  @Column()
  puesto: Puesto;

  @Column({ type: 'money' })
  sueldo: number;

  @Column()
  email: string;

}
