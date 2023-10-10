import { Module } from "@nestjs/common";
import { DirectionsController } from "./directions.controller";
import { DirectionsService } from './directions.service';
import { TypeOrmModule } from "@nestjs/typeorm"; 
import { DirectiosEntity } from "./directions.entity";
import { Repository } from 'typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([DirectiosEntity])],
    controllers: [DirectionsController],
    providers: [DirectionsService, DirectiosEntity, Repository]
})

export class directionsModule {}