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
  import { UpdateGroupDto } from './dto/update-group-dto';
 
  
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
    const nombreGrupo = `${group.day} ${group.schedule} ${teacher.firstName}`;
    const newGroup = new GroupsEntity( group.schedule, nombreGrupo, teacher, group.day);
    const confirmGroup = await this.groupsService.findOneBy({
      name: newGroup.name,
    });
    if (confirmGroup) {
      throw new ConflictException('El grupo ya existe.');
    }
    return this.groupsService.create(newGroup);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() group: GroupsEntity,
  ): Promise<GroupsEntity> {
    const existingGroup = await this.groupsService.findOne(id);

    if (!existingGroup) {
      throw new NotFoundException('Grupo no encontrado');
    }

    existingGroup.schedule = group.schedule;
    existingGroup.day = group.day;

  const teacher = await this.teacherService.findOneById(group.teacher);
  if (!teacher) {
    throw new NotFoundException('No existe maestro');
  }
  existingGroup.name = `${group.day} ${group.schedule} ${teacher.firstName}`;

    return this.groupsService.update(id, existingGroup);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const group = await this.groupsService.findOneWithRelations(id);
  
    if (!group) {
      throw new NotFoundException('Grupo no encontrado');
    }
  
    if (group.students && group.students.length > 0) {
      throw new ConflictException('No se puede eliminar un grupo con alumnos');
    }
  
    // Si no hay alumnos asociados, se puede eliminar el grupo
    await this.groupsService.remove(id);
  }
}