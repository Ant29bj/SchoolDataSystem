import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsEntity } from './groups.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll(): Promise<GroupsEntity[]> {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<GroupsEntity> {
    return this.groupsService.findOne(id);
  }

  @Post()
  create(@Body() group: CreateGroupDto): Promise<GroupsEntity> {
    return this.groupsService.create(group);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() group: GroupsEntity): Promise<GroupsEntity> {
    return this.groupsService.update(id, group);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.groupsService.remove(id);
  }
}
