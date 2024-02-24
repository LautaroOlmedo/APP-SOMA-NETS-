import { Test, TestingModule } from '@nestjs/testing';
import { MovmentOutService } from '../services/movment-out.service';

describe('MovmentOutService', () => {
  let service: MovmentOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovmentOutService],
    }).compile();

    service = module.get<MovmentOutService>(MovmentOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
