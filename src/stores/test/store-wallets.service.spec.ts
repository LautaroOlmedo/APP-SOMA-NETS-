import { Test, TestingModule } from '@nestjs/testing';
import { StoreWalletsService } from '../services/store-wallets.service';

describe('StoreWalletsService', () => {
  let service: StoreWalletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreWalletsService],
    }).compile();

    service = module.get<StoreWalletsService>(StoreWalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
