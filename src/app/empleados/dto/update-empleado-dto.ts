import { DirectionsEntity } from "src/app/directions/directions.entity"
import{Puesto} from '../empleados.entity'
export class UpdateEmpleadoDto {
    firstName: string
    lastName: string
    rfc: string
    phone: number
    puesto: Puesto
    sueldo: number
    email: string
    /*direction: DirectionsEntity
*/
}