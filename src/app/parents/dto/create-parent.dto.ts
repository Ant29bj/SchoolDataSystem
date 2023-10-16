import { CreateDirectionDto } from "src/app/directions/dto/create-direction.dto"
import { CreateStudentDto } from "src/app/students/dto/create-student.dto"

export class CreateParentDto {
    firstName: string
    lastName: string
    email: string
    providence: string
    intNumber: string
    ExtNumber: string
    direction: CreateDirectionDto
    protegido: CreateStudentDto
}