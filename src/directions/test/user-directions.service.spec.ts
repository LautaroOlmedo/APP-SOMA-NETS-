import { Test, TestingModule } from '@nestjs/testing';
import { UserDirectionsService } from '../services/user-directions.service';

describe('UserDirectionsService', () => {
  let service: UserDirectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDirectionsService],
    }).compile();

    service = module.get<UserDirectionsService>(UserDirectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
