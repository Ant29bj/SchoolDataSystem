import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOptions,
  FindOptionsWhere,
  Repository,
  getRepository,
} from 'typeorm';
import { GroupsEntity } from './groups.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { GenericService } from '../generics/generic.service';
import { CareersEntity } from '../careers/careers.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity)
    private readonly groupsRepository: Repository<GroupsEntity>,
    @InjectRepository(CareersEntity)
    private careersRepository: Repository<CareersEntity>,
  ) {}

  findAll(options?: FindManyOptions<GroupsEntity>): Promise<GroupsEntity[]> {
    return this.groupsRepository.find(options);
  }

  findOneBy(options?: FindOptionsWhere<GroupsEntity>) {
    return this.groupsRepository.findOneBy(options);
  }

  findOne(id: number): Promise<GroupsEntity> {
    return this.groupsRepository.findOne({
      where: { id },
      relations: ['teacher', 'studentGroups.student', 'carrera'],
    });
  }

  async create(group: GroupsEntity): Promise<GroupsEntity> {
    const newGroup = this.groupsRepository.create(group);
    return await this.groupsRepository.save(newGroup);
  }

  async update(id: number, group: GroupsEntity): Promise<GroupsEntity> {
    await this.groupsRepository.update(id, group);
    return await this.groupsRepository.findOne({ where: { id } });
  }
  async findOneWithRelations(id: string): Promise<GroupsEntity | undefined> {
    return this.groupsRepository

      .createQueryBuilder('group')
      .leftJoinAndSelect('group.students', 'students')
      .where('group.id = :id', { id })
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}
