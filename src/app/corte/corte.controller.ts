import { Body, Controller, Get, Post } from '@nestjs/common';
import { CorteService } from './corte.service';
import { SetearHorarioCorte } from './dto/SetaerHorarioCorte';

@Controller('corte')
export class CorteController {
  constructor(private readonly corteService: CorteService) { }

  @Get()
  public async test() {
    return this.corteService.findAll()
  }

  @Post()
  async create(@Body() data: SetearHorarioCorte) {
    return await this.corteService.createCorte(data);
  }
}
