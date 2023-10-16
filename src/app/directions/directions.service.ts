import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectionsEntity } from './directions.entity';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { GenericService } from '../generics/generic.service';

@Injectable()
export class DirectionsService extends GenericService<DirectionsEntity>{
  constructor(
    @InjectRepository(DirectionsEntity)
    private readonly directionsRepository: Repository<DirectionsEntity>,
  ) {super(directionsRepository)}

}
