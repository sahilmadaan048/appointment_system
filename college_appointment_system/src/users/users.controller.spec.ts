import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: Repository<User>, useValue: {}}],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
