import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
<<<<<<< HEAD
  createAt: Date;
=======
  careateAt: Date;
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: number;
}
