import { Test, TestingModule } from '@nestjs/testing';
import { UserEmailsController } from '../controllers/user-emails.controller';

describe('UserEmailsController', () => {
  let controller: UserEmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEmailsController],
    }).compile();

    controller = module.get<UserEmailsController>(UserEmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
