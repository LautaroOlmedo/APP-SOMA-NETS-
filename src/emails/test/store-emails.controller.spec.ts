import { Test, TestingModule } from '@nestjs/testing';
import { StoreEmailsController } from '../controllers/store-emails.controller';

describe('StoreEmailsController', () => {
  let controller: StoreEmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreEmailsController],
    }).compile();

    controller = module.get<StoreEmailsController>(StoreEmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
