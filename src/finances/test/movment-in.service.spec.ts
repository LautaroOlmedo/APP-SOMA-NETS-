import { Test, TestingModule } from '@nestjs/testing';
import { MovmentInService } from '../services/movment-in.service';

describe('MovmentInService', () => {
  let service: MovmentInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovmentInService],
    }).compile();

    service = module.get<MovmentInService>(MovmentInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
