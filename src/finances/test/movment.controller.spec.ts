import { Test, TestingModule } from '@nestjs/testing';
import { MovmentController } from '../controllers/movment.controller';

describe('MovmentController', () => {
  let controller: MovmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovmentController],
    }).compile();

    controller = module.get<MovmentController>(MovmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
