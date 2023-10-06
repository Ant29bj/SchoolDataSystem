import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

enum Roles{
    Admininistrador = 'administrador',
    Empleado = 'empleado'
}
@Entity('users')
export class UsersEntity extends GenericEntity{
  @PrimaryGeneratedColumn()

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({unique: true })
  email: string;

  @Column()
  password: string;

  @Column('text')
  rol: Roles;
}
