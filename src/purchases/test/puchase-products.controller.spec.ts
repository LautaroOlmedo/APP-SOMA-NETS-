import { Test, TestingModule } from '@nestjs/testing';
import { PuchaseProductsController } from '../controllers/puchase-products.controller';

describe('PuchaseProductsController', () => {
  let controller: PuchaseProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuchaseProductsController],
    }).compile();

    controller = module.get<PuchaseProductsController>(
      PuchaseProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
