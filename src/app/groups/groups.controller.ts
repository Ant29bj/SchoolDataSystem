import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsEntity } from './groups.entity';
import { TeachersService } from '../teachers/teachers.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { StudentsGroupsService } from '../students_groups/students_groups.service';
import { GenericController } from '../generics/generic.controller';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly teacherService: TeachersService,
    private readonly studentsGroupsService: StudentsGroupsService
  ) {}
  @Get()
  findAll(): Promise<GroupsEntity[]> {
    return this.groupsService.findAll({ relations: ['teacher', 'studentGroups.student'] });
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<GroupsEntity> {
    return this.groupsService.findOne(id);
  }

  @Post()
  async create(@Body() group: CreateGroupDto): Promise<GroupsEntity> {
    const teacher = await this.teacherService.findOneById(group.teacher);

    if (!teacher) {
      throw new NotFoundException('No existe maestro');
    }
    const nombreGrupo = `${group.day} ${group.schedule} ${teacher.firstName}`;
    const newGroup = new GroupsEntity(
      group.schedule,
      nombreGrupo,
      teacher,
      group.modulo,
      group.day,
    );
    const confirmGroup = await this.groupsService.findOneBy({
      name: newGroup.name,
    });
    if (confirmGroup) {
      throw new ConflictException('El grupo ya existe.');
    }
    const updatedGroup = await this.groupsService.create(newGroup);

    const teacherConfimr = await this.teacherService.update(teacher.id, {
      group: updatedGroup.id,
    });

    return updatedGroup;
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

    if (group.teacher) {
      const teacher = await this.teacherService.findOneById(group.teacher.id);

      if (!teacher) {
        throw new NotFoundException('No existe maestro');
      }

      // Construir el nuevo nombre del grupo con el nuevo profesor
      const nombreGrupo = `${group.day} ${group.schedule} ${teacher.firstName}`;
      group.name = nombreGrupo;
    } else {
      // Si no se proporciona un nuevo profesor, usar el nombre existente o construirlo nuevamente
      group.name =
        group.name ||
        `${group.day} ${group.schedule} ${
          existingGroup.teacher?.firstName || ''
        }`;
    }
    console.log(group)
    let studentgroups;
    studentgroups = group.studentGroups;
    await Promise.all(studentgroups.map(async (studentGroup, index) => {
      if (studentGroup.student != null){
        let updatedStudentGroup = await this.studentsGroupsService.setStudentGrade(studentGroup.student.id, id, studentGroup.grade);
      }   
    }));
    delete group.studentGroups;
    const updatedGroup = await this.groupsService.update(id, group);

    // Actualizar el nombre del grupo en el objeto de respuesta
    updatedGroup.name = group.name;

    return updatedGroup;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const group = await this.groupsService.findOneWithRelations(id);
 
    if (!group) {
      throw new NotFoundException('Grupo no encontrado');
    }

    /* if (group.students && group.students.length > 0) {
      throw new ConflictException('No se puede eliminar un grupo con alumnos');
    } */

    // Si no hay alumnos asociados, se puede eliminar el grupo
    await this.groupsService.remove(id);
  }
}
