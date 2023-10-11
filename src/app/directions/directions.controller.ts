import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateDirectionsDto } from './dto/create-directions.dto';
import { DirectionsService } from './directions.service';
import { DirectiosEntity } from './directions.entity';
import { UpdateDirectionDto } from './dto/update-direction.dto';




@Controller('directions')
export class DirectionsController {

    constructor( private  directionsService: DirectionsService) {}

    @Get()
    getDirections(): Promise<DirectiosEntity[]> {
        return this.directionsService.getDirections();
    }

    @Get(':id')
    getDirection(@Param('id', ParseIntPipe) id: number) {
        return this.directionsService.getDirection(id);
    }

    @Post()
    createDirections (@Body() newDirection: CreateDirectionsDto): Promise<DirectiosEntity> {
        return this.directionsService.createDirections(newDirection);
    }

    @Delete(':id')
    deleteDirection(@Param('id', ParseIntPipe) id: number) {
        return this.directionsService.deleteDirection(id)
    }

    @Patch('id:') 
    updateDirection(@Param('id', ParseIntPipe) id: number, @Body()
    direction: UpdateDirectionDto) {
        return this.directionsService.updateDirection(id, direction)
        
    }

}
