import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionsEntity } from './directions.entity';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectRepository(DirectionsEntity)
    private readonly directionsRepository: Repository<DirectionsEntity>,
  ) {}

  findAll(): Promise<DirectionsEntity[]> {
    return this.directionsRepository.find();
  }

  findOne(id: number): Promise<DirectionsEntity | undefined> {
    return this.directionsRepository.findOne({where: {id} });
  }

  async create(direction: DirectionsEntity): Promise<DirectionsEntity> {
    const newDirection = this.directionsRepository.create(direction);
    return await this.directionsRepository.save(newDirection);
  }

  async update(id: number, direction: DirectionsEntity): Promise<DirectionsEntity> {
    await this.directionsRepository.update(id, direction);
    return await this.directionsRepository.findOne({where: {id} });
  }

  async remove(id: string): Promise<void> {
    await this.directionsRepository.delete(id);
  }
}
