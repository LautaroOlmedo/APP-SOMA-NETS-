import { Test, TestingModule } from '@nestjs/testing';
import { StoreDirectionsService } from '../services/store-directions.service';

describe('StoreDirectionsService', () => {
  let service: StoreDirectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreDirectionsService],
    }).compile();

    service = module.get<StoreDirectionsService>(StoreDirectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
