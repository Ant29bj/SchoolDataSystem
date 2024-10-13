import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { StudentsGroupsService } from './students_groups.service';
import { StudentsGroupsEntity } from './students_groups.entity';

@Controller('students-groups')
export class StudentsGroupsController {
    constructor(private readonly studentsGroupsService: StudentsGroupsService){    }
    @Post('set-student-group')
    async setStudentGroup( 
        @Body('student_id') student_id: number,
        @Body('group_id') group_id: number,
        @Body('basic_grade') basic_grade: number | null,
        @Body('inter_grade') inter_grade: number | null,
        @Body('inter_advanced_grade') inter_advanced_grade: number | null,
        @Body('advanced_grade') advanced_grade: number | null,
        @Body('inscripcion') inscripcion: number | null,
        @Body('mensualidad') mensualidad: number | null
    ): Promise<StudentsGroupsEntity>{
        return await this.studentsGroupsService.setStudentGrade(student_id, group_id, basic_grade, inter_grade,inter_advanced_grade,advanced_grade, inscripcion, mensualidad);
    }

    @Get('group/:group_id')
    async getStudentsGroupsByGroup(@Param('group_id') group_id: number) {
        return await this.studentsGroupsService.getStudentsGroupsByGroup(group_id);
    }

    @Get('student/:student_id')
    async getStudentsGroupsByStudent(@Param('student_id') student_id: number) {
        return await this.studentsGroupsService.getStudentsGroupsByStudent(student_id);
    }
    @Put('mergeGroups')
    async mergeGroups(@Body('group_stay') group_stay: number,@Body('group_delete') group_delete: number,){
        
        return await this.studentsGroupsService.mergeGroup(group_stay, group_delete);
    }
}
