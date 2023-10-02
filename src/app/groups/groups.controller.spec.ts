import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
<<<<<<< HEAD
import { GroupsService } from './groups.service';
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
<<<<<<< HEAD
      providers: [GroupsService],
=======
>>>>>>> 2c898e8 (tablas creadas falta relaciones)
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
