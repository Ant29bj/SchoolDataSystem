import { Module } from '@nestjs/common';
import { DirectionsController } from './directions.controller';
import { DirectionsService } from './directions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionsEntity } from './directions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectionsEntity])],
  controllers: [DirectionsController],
  providers: [DirectionsService]
})
export class DirectionsModule {}