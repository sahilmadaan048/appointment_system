import { Module } from '@nestjs/common';
import { AvailabilitiesController } from './availabilities.controller';
import { AvailabilitiesService } from './availabilities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './availabilities.entity';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Availability]), UsersModule],
  controllers: [AvailabilitiesController],
  providers: [AvailabilitiesService],
  exports: [TypeOrmModule],
})
export class AvailabilitiesModule { }
