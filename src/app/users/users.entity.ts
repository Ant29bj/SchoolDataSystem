import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GenericEntity } from '../generics/generic.entity';

@Entity('users')
export class UsersEntity extends GenericEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  //ID empleado
  @Column()
  empleado: string;

  @Column()
  ultimo_login: Date;
}
