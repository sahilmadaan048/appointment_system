import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointments.entity';
import { UsersService } from 'src/users/users.service';
import { Availability } from 'src/availabilities/availabilities.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: {}, 
        },
        {
          provide: getRepositoryToken(Availability),
          useValue: {},
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],

    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
