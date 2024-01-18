import { ConceptoPago } from '../student-payment.entity';

export class CreatePaymentDto {
  nombreCliente: string;
  importe: number;
  carrera: string;
  concepto: ConceptoPago;
}
