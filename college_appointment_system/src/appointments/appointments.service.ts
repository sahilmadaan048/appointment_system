import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UsersService } from '../users/users.service';
import { Availability } from '../availabilities/availabilities.entity';
import { InjectRepository as InjectRepositoryAvailability } from '@nestjs/typeorm';


@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment) private apptRepo: Repository<Appointment>,
        @InjectRepositoryAvailability(Availability) private availRepo: Repository<Availability>,
        private usersService: UsersService,
    ) { }

    // Student books an available slot
    async book(studentId: number, dto: CreateAppointmentDto) {
        const student = await this.usersService.findById(studentId);
        if (!student || student.role !== 'student') {
            throw new BadRequestException('Invalid student ID');
        }
        const prof = await this.usersService.findById(dto.professorId);
        if (!prof || prof.role !== 'professor') {
            throw new BadRequestException('Invalid professor ID');
        }
        // Find availability slot
        const slot = await this.availRepo.findOne({
            where: {
                professor: { id: dto.professorId },
                startTime: new Date(dto.timeSlot),
            },
        });
        if (!slot) {
            throw new BadRequestException('Requested time slot not available');
        }
        // Remove the availability (slot is no longer free once booked)
        await this.availRepo.remove(slot);
        // Create appointment
        const appt = this.apptRepo.create({
            timeSlot: new Date(dto.timeSlot),
            status: 'booked',
            student: student,
            professor: prof,
        });
        return this.apptRepo.save(appt);
    }

    // Get appointments for a user (student or professor), only active bookings
    async findForUser(userId: number, role: string): Promise<Appointment[]> {
        if (role === 'student') {
            return this.apptRepo.find({
                where: { student: { id: userId }, status: 'booked' },
                relations: ['professor'],
            });
        } else if (role === 'professor') {
            return this.apptRepo.find({
                where: { professor: { id: userId }, status: 'booked' },
                relations: ['student'],
            });
        }
        return [];
    }

    // Professor cancels an appointment
    async cancel(professorId: number, appointmentId: number) {
        const appt = await this.apptRepo.findOne({
            where: { id: appointmentId },
            relations: ['professor'],
        });
        if (!appt || appt.professor.id !== professorId) {
            throw new BadRequestException('Appointment not found or not yours');
        }
        appt.status = 'cancelled';
        return this.apptRepo.save(appt);
    }
}
