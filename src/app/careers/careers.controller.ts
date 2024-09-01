import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersEntity } from './careers.entity';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post()
  create(@Body() createCareerDto: Partial<CareersEntity>): Promise<CareersEntity> {
    return this.careersService.create(createCareerDto);
  }

  @Get()
  findAll(): Promise<CareersEntity[]> {
    return this.careersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<CareersEntity> {
    return this.careersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCareerDto: Partial<CareersEntity>,
  ): Promise<CareersEntity> {
    return this.careersService.update(id, updateCareerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.careersService.remove(id);
  }
}
