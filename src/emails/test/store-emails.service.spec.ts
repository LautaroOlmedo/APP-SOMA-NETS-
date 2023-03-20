import { Test, TestingModule } from '@nestjs/testing';
import { StoreEmailsService } from '../services/store-emails.service';

describe('StoreEmailsService', () => {
  let service: StoreEmailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreEmailsService],
    }).compile();

    service = module.get<StoreEmailsService>(StoreEmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
