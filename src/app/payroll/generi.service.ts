import { Injectable } from '@nestjs/common';
import { GenericService } from '../generics/generic.service';
import { Payroll } from './payroll.entity';

@Injectable()
export class PayrrollService extends GenericService<Payroll> {}
