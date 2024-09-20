import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Status, StudentsEntity } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { GenericController } from '../generics/generic.controller';
import { ApiBody } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { ParentsService } from '../parents/parents.service';
import { StudentsGroupsService } from '../students_groups/students_groups.service';
import { GroupsService } from '../groups/groups.service';
import { TransformarDeuda } from './utlis/transform-type-money';

@Controller('students')
export class StudentsController extends GenericController<
  StudentsEntity,
  StudentsService
> {
  constructor(private readonly studentsService: StudentsService,private parentsService: ParentsService, private studentsGroupsService: StudentsGroupsService, private readonly groupsService: GroupsService) {
    super(studentsService);
  }

  @ApiBody({ type: CreateStudentDto, required: true })
  @Post()
  override async create(@Body() newStudent: StudentsEntity) {

    const year = new Date(newStudent.birthDay).getUTCFullYear().toString();
    const mes = new Date(newStudent.birthDay).getUTCMonth() + 1;
    newStudent.matricula = `${year}${mes}${newStudent.curp.substring(
      0,
      4,
    )}${this.studentsService.generateRandomChars(3)}`;
    const fecha = new Date();

    const paymentDate = new Date(fecha.getTime() + 30 * 24 * 60 * 60 * 1000);

    newStudent.registrationDate = fecha;
    newStudent.paymentDate = paymentDate;
    
    const updatedParent = await this.parentsService.create(newStudent.parents);
    newStudent.parents = updatedParent;
    
    let studentgroups;
    studentgroups = newStudent.studentGroups;
    let grupo = await this.groupsService.findOne(studentgroups[0].group.id);
    //newStudent.inscripcion = TransformarDeuda( grupo.carrera.inscripcion);
    //newStudent.debt =  TransformarDeuda( grupo.carrera.mensualidad);


    const student =await this.studentsService.create(newStudent);
    

    await Promise.all(studentgroups.map(async (studentGroup, index) => {
        let updatedStudentGroup = await this.studentsGroupsService.setStudentGrade(newStudent.id, studentGroup.group.id, null, null,null,null);
        newStudent.studentGroups[index] = updatedStudentGroup;
    }));
    
    return student;
  }

  @Get()
  override find(@Param() options?: FindManyOptions<StudentsEntity>) {
    return this.studentsService.find({
      relations: ['studentGroups.group.teacher', 'payments', 'studentGroups','parents', 'studentGroups.group.carrera'],
    });
  }

  @Get('/matricula')
  findOneByMatricula(@Query('matricula') matricula: string) {
    return this.studentsService.findOne({
      where: {
        matricula: matricula,
      },
      relations: ['group', 'payments'],
    });
  }

  @Get('/like/:cadena')
  findLike(@Param('cadena') cadena: string) {
    return this.studentsService.findLike(cadena);
  }

  @Get('/find')
  async buscarStudent(@Query('options') options: string) {
    return this.studentsService.find({
      where: JSON.parse(options),
      relations: ['payments'],
    });
  }

  @Get('/proximos')
  async mostrarProximos() {
    return this.studentsService.find({ where: { status: Status.Proximo } });
  }

  @Put()
  @Patch()
  async update(@Param('id') id: number, @Body() entity: StudentsEntity) {
    console.log('Entro: ',entity.studentGroups)
    let studentgroups;
    studentgroups = entity.studentGroups;
    console.log('cambio: ',entity)
    
    const student_updated = await this.studentsService.update(id, entity);

    await Promise.all(studentgroups.map(async (studentGroup, index) => {
      //console.log('for: ',studentGroup)
        let updatedStudentGroup = await this.studentsGroupsService.setStudentGrade(entity.id, studentGroup.group.id, studentGroup.basic_grade, studentGroup.inter_grade,studentGroup.inter_advanced_grade,studentGroup.advanced_grade);
        student_updated.studentGroups[index] = updatedStudentGroup;
    }));

    return student_updated
    
}

  @Delete()
  override delete(@Query('id') id: number) {
    return this.studentsService.delete(id);
  }

  @Post('/abonar')
  async abonarMensualidad(
    @Query('matricula') matricula: string,
    @Query('pago') pago: number,
  ) {
    const verficar = !matricula || !pago ? false : true;
    if (!verficar)
      new HttpException('Datos incompletos', HttpStatus.BAD_REQUEST);

    try {
      // this.studentsService.abonarMensualidad(matricula, pago);
      // return { message: 'Operacion exitosa' };
      return await this.studentsService.abonarMensualidad(matricula, pago);
    } catch (err) {
      return err;
    }
  }
}
