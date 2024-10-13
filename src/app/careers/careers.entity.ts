import {
    Column,
    Entity,
  } from 'typeorm';
  import { GenericEntity } from '../generics/generic.entity';
  
  
  @Entity('careers')
  export class CareersEntity extends GenericEntity {
  
    @Column({ unique: true })
    carrera?: string;
  
  }
  