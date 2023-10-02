import { Test, TestingModule } from '@nestjs/testing';
import { ParentsController } from './parents.controller';
<<<<<<< HEAD
import { ParentsService } from './parents.service';
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

describe('ParentsController', () => {
  let controller: ParentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentsController],
<<<<<<< HEAD
      providers: [ParentsService],
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
    }).compile();

    controller = module.get<ParentsController>(ParentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
