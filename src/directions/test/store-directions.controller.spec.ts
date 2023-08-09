import { Test, TestingModule } from '@nestjs/testing';
import { StoreDirectionsController } from '../controllers/store-directions.controller';

describe('StoreDirectionsController', () => {
  let controller: StoreDirectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreDirectionsController],
    }).compile();

    controller = module.get<StoreDirectionsController>(
      StoreDirectionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
