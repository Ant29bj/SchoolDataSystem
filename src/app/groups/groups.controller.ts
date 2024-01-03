import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpException,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { GroupsService } from './groups.service';
  import { GroupsEntity } from './groups.entity';
  import { TeachersService } from '../teachers/teachers.service';
  import { CreateGroupDto } from './dto/create-group.dto';
 
  
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly teacherService: TeachersService,
  ) {}
  @Get()
  findAll(): Promise<GroupsEntity[]> {
    return this.groupsService.findAll({ relations: ['teacher', 'students'] });
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<GroupsEntity> {
    return this.groupsService.findOne(id);
  }

  @Post()
  async create(@Body() group: CreateGroupDto): Promise<GroupsEntity> {
    console.log(group);
    const teacher = await this.teacherService.findOneById(group.teacher);

    if (!teacher) {
      throw new NotFoundException('No existe maestro');
    }
    const nombreGrupo = `${group.schedule} ${teacher.firstName}`;
    const newGroup = new GroupsEntity(group.schedule, nombreGrupo, teacher);
    const confirmGroup = await this.groupsService.findOneBy({
      name: newGroup.name,
    });
    if (confirmGroup) {
      throw new ConflictException('El grupo ya existe.');
    }
    return this.groupsService.create(newGroup);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() group: GroupsEntity,
  ): Promise<GroupsEntity> {
    return this.groupsService.update(id, group);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.groupsService.remove(id);
  }
}