import { Test, TestingModule } from '@nestjs/testing';
import { StoreClientsService } from '../services/store-clients.service';

describe('StoreClientsService', () => {
  let service: StoreClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreClientsService],
    }).compile();

    service = module.get<StoreClientsService>(StoreClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
