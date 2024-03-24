import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParentsEntity } from './parents.entity';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(ParentsEntity)
    private readonly parentsRepository: Repository<ParentsEntity>,
  ) {}

  findAll(): Promise<ParentsEntity[]> {
    return this.parentsRepository.find();
  }
  findParent(data:any): Promise<ParentsEntity[]> {
    return this.parentsRepository.find({where: {email : data}} );
  }
  findOne(id: number): Promise<ParentsEntity> {
    return this.parentsRepository.findOne({ where: { id } });
  }

  async create(parent: ParentsEntity): Promise<ParentsEntity> {
    const newParent = this.parentsRepository.create(parent);
    return await this.parentsRepository.save(newParent);
  }

  async update(id: number, parent: ParentsEntity): Promise<ParentsEntity> {
    await this.parentsRepository.update(id, parent);
    return await this.parentsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.parentsRepository.delete(id);
  }
}
