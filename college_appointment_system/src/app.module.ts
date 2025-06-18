import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AvailabilitiesModule } from './availabilities/availabilities.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [UsersModule, AuthModule, AvailabilitiesModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
