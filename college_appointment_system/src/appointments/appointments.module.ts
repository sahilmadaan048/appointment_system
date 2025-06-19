import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { UsersModule } from 'src/users/users.module';
import { AvailabilitiesModule } from 'src/availabilities/availabilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), UsersModule, AvailabilitiesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
