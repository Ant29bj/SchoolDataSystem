import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
<<<<<<< HEAD
import { StudentsService } from './students.service';
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
<<<<<<< HEAD
      providers: [StudentsService],
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
