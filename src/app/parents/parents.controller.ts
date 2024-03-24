import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import {  ParentsService } from './parents.service';
import { GenericController } from '../generics/generic.controller';
import { ParentsEntity } from './parents.entity';
import { FindManyOptions } from 'typeorm';


@Controller('parents')
export class ParentsController {
  constructor(private parentsService: ParentsService) {}

  @Get()
  findAll(): Promise<ParentsEntity[]> {
    return this.parentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ParentsEntity> {
    return this.parentsService.findOne(id);
  }

  @Post()
  async create(parentData: ParentsEntity): Promise<ParentsEntity> {
    let existingParents = await this.parentsService.findParent(parentData.email);

    // Si no se encuentra ningún padre existente, existingParents será un array vacío
    if (existingParents.length === 0) {
      // No se encontraron padres existentes, así que insertamos uno nuevo
      const newParent = await this.parentsService.create(parentData);
      return newParent;
    } else {
      // Se encontró al menos un padre existente
      // Por simplicidad, tomamos el primer padre de la lista
      const existingParent = existingParents[0];
      return existingParent;
    }

  }

  @Put(':id')
  update(@Param('id') id: number, @Body() parent: ParentsEntity): Promise<ParentsEntity> {
    return this.parentsService.update(id, parent);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.parentsService.remove(id);
  }
}
