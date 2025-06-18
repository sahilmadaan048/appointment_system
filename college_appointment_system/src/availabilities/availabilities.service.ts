import { BadRequestException, Injectable } from '@nestjs/common';
import { Availability } from './availabilities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AvailabilitiesService {
    constructor(
        @InjectRepository(Availability) private availRepo: Repository<Availability>,
        private usersService :UsersService,
    ) {}

    async create(professorId: number, dto: CreateAvailabilityDto) {
        const prof = await this.usersService.findById(professorId);
        if(!prof || prof.role !== 'professor') {
            throw new BadRequestException('Invalid Professor ID');
        }
        const availability = this.availRepo.create({
            startTime: new Date(dto.startTime),
            endTime: new Date(dto.endTime),
            professor: prof,
        });
        return this.availRepo.save(availability);
    }

    async findByProfessor(professorId: number): Promise<Availability[]> {
        return this.availRepo.find({
            where: { professor: {id: professorId}},
            relations: ['professor'],
        });
    }
}
