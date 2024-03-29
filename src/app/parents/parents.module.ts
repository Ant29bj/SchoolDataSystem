import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentsEntity } from './parents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentsEntity])],
  controllers: [ParentsController],
  providers: [ParentsService],
  exports: [ParentsService],
})
export class ParentsModule {}
