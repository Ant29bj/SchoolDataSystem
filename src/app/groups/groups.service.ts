import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupsEntity } from './groups.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { GenericService } from '../generics/generic.service';

@Injectable()
export class GroupsService extends GenericService<GroupsEntity>{
  constructor(
    @InjectRepository(GroupsEntity)
    private readonly groupsRepository: Repository<GroupsEntity>,
  ) {super(groupsRepository)}
}
