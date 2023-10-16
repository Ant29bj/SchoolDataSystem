import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupsEntity } from './groups.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity)
    private readonly groupsRepository: Repository<GroupsEntity>,
  ) {}

  findAll(): Promise<GroupsEntity[]> {
    return this.groupsRepository.find();
  }

  findOne(id: number): Promise<GroupsEntity> {
    return this.groupsRepository.findOne({where: {id} });
  }

  async create(group: CreateGroupDto): Promise<GroupsEntity> {
    const newGroup = this.groupsRepository.create(group);
    return await this.groupsRepository.save(newGroup);
  }

  async update(id: number, group: GroupsEntity): Promise<GroupsEntity> {
    await this.groupsRepository.update(id, group);
    return await this.groupsRepository.findOne({where: {id} });
  }

  async remove(id: string): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
