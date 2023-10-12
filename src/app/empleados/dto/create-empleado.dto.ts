import { DirectionsEntity } from "src/app/directions/directions.entity"
import{Puesto} from '../empleados.entity'

export class CreateEmpleadoDto {
    firstName: string
    lastName: string
    rfc: string
    phone: string
    puesto: Puesto
    sueldo: number
    email: string
    /*direction: DirectionsEntity
*/}