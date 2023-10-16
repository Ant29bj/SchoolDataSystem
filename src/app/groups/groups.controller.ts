import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsEntity } from './groups.entity';
import { ApiBody } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { GenericController } from '../generics/generic.controller';

@Controller('groups')
export class GroupsController extends GenericController<GroupsEntity,GroupsService>{
  constructor(private readonly groupsService: GroupsService) {super(groupsService)}

  @ApiBody({type: CreateGroupDto, required: true})
  @Post()
  override async create(@Body() group: CreateGroupDto){
    return this.groupsService.create(group);
  }
  @ApiBody({type: CreateGroupDto, required: true})
  @Put(':id')
  override async update(@Param('id') id: number, @Body() group: GroupsEntity){
    return this.groupsService.update(id, group);
  }


}
