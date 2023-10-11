import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directions } from './directions.entity';
import { DirectionsController } from './directions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Directions])],
  controllers: [DirectionsController],
  providers: [],
})
export class DirectionsModule {}
