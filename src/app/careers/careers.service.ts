import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareersEntity } from './careers.entity';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(CareersEntity)
    private careersRepository: Repository<CareersEntity>,
  ) {}

  async create(career: Partial<CareersEntity>): Promise<CareersEntity> {
    return this.careersRepository.save(career);
  }

  async findAll(): Promise<CareersEntity[]> {
    return this.careersRepository.find();
  }

  async findOne(id: number): Promise<CareersEntity> {
    return this.careersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<CareersEntity>): Promise<CareersEntity> {
    await this.careersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.careersRepository.delete(id);
  }
}
