import { Test, TestingModule } from '@nestjs/testing';
import { DirectionsController } from './directions.controller';
<<<<<<< HEAD
import { DirectionsService } from './directions.service';
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

describe('DirectionsController', () => {
  let controller: DirectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectionsController],
<<<<<<< HEAD
      providers: [DirectionsService],
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
    }).compile();

    controller = module.get<DirectionsController>(DirectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
