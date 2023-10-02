import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
<<<<<<< HEAD
import { TeachersService } from './teachers.service';
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

describe('TeachersController', () => {
  let controller: TeachersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachersController],
<<<<<<< HEAD
      providers: [TeachersService],
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
    }).compile();

    controller = module.get<TeachersController>(TeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
