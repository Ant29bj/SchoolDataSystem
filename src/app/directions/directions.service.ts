import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectionsEntity } from './directions.entity';
import { CreateDirectionsDto } from './dto/create-directions.dto';

import { UpdateDirectionDto } from './dto/update-direction.dto';
import { Repository } from 'typeorm';



@Injectable()
export class DirectionsService {

    constructor(@InjectRepository(DirectionsEntity) private directionRepository : Repository<DirectionsEntity> ) {}

    createDirections(directions: CreateDirectionsDto) {
        const newDirection = this.directionRepository.create(directions)
        return this.directionRepository.save(newDirection)
    }

    getDirections() {
        return this.directionRepository.find()
    }

    async getDirection(id: number) {
       const directionFound = await this.directionRepository.findOne({
            where: {
                id
            },
        });

        if (!directionFound) {
            return new HttpException('Direction not found', HttpStatus.NOT_FOUND)
        }

        return directionFound;
    }

    async deleteDirection(id: number) {
       const result = await this.directionRepository.delete({ id });

       if (result.affected) {
        return new HttpException( 'Direction not found', HttpStatus.NOT_FOUND);
       }

       return result;
    }


   async updateDirection(id: number, direction: UpdateDirectionDto) {
        const directionFound = await this.directionRepository.findOne({
            where : {
                id
            }
        })

        if (!directionFound) {
            return new HttpException('Direction not found', HttpStatus.NOT_FOUND);
        }

        const updateDirection = Object.assign(directionFound, direction);
        return this.directionRepository.save(updateDirection);

    }

    
}