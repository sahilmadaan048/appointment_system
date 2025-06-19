import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilitiesService } from './availabilities.service';
import { UsersService } from 'src/users/users.service';
import { Availability } from './availabilities.entity';
import {getRepositoryToken} from '@nestjs/typeorm';

describe('AvailabilitiesService', () => {
  let service: AvailabilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilitiesService,
        { provide: getRepositoryToken(Availability), useValue: {} },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    service = module.get<AvailabilitiesService>(AvailabilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
