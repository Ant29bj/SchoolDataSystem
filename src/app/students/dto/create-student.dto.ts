import { DirectionsEntity } from "src/app/directions/directions.entity"
import { ParentsEntity } from "src/app/parents/parents.entity"

export class CreateStudentDto {
    firstName: string
    lastName: string
    phone: string
    amount: number
    email: string
    aumentos: boolean
    birthDay?: string
    grade: number
    debt: number
    paymentDate: string
    /*direction: DirectionsEntity
    parents: ParentsEntity
*/}