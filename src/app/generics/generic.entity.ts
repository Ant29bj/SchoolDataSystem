import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async beforeInsertActions() {
    const now = new Date();
    this.createAt = now;
    this.updateAt = now;
  }

  @DeleteDateColumn()
  deletedAt: number;
}
