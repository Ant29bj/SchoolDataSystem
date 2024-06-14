import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGroupsController } from './students_groups.controller';

describe('StudentsGroupsController', () => {
  let controller: StudentsGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsGroupsController],
    }).compile();

    controller = module.get<StudentsGroupsController>(StudentsGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
