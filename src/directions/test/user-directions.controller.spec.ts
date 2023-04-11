import { Test, TestingModule } from '@nestjs/testing';
import { UserDirectionsController } from '../controllers/user-directions.controller';

describe('UserDirectionsController', () => {
  let controller: UserDirectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDirectionsController],
    }).compile();

    controller = module.get<UserDirectionsController>(UserDirectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
