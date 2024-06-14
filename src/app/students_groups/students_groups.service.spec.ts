import { Test, TestingModule } from '@nestjs/testing';
import { StudentsGroupsService } from './students_groups.service';

describe('StudentsGroupsService', () => {
  let service: StudentsGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsGroupsService],
    }).compile();

    service = module.get<StudentsGroupsService>(StudentsGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
