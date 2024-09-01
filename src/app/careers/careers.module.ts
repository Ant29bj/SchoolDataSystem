import { Module } from '@nestjs/common';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersEntity } from './careers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CareersEntity])],
  controllers: [CareersController],
  providers: [CareersService],
  exports: [CareersService, TypeOrmModule],
})
export class CareersModule {}
