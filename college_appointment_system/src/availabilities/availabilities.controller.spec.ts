import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilitiesController } from './availabilities.controller';
import { AvailabilitiesService } from './availabilities.service';

describe('AvailabilitiesController', () => {
  let controller: AvailabilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilitiesController],
      providers: [
        {
          provide: AvailabilitiesService,
          useValue: {
            create: jest.fn(),
            findByProfessor: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AvailabilitiesController>(AvailabilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
