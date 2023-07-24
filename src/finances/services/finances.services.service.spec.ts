import { Test, TestingModule } from '@nestjs/testing';
import { FinancesServicesService } from './finances.services.service';

describe('FinancesServicesService', () => {
  let service: FinancesServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancesServicesService],
    }).compile();

    service = module.get<FinancesServicesService>(FinancesServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
