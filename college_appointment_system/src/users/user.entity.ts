import { Appointment } from 'src/appointments/appointments.entity';
import { Role } from 'src/auth/role.enum';
import { Availability } from 'src/availabilities/availabilities.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string; 
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Student,
    })
    role: Role;

    @OneToMany(() => Availability, (availability) => availability.professor)
    availabilities: Availability[];
    
    
    @OneToMany(() => Appointment, (appointment) => appointment.student)
    studentAppointments: Appointment[];
    
    @OneToMany(() => Appointment, (appointment) => appointment.professor)
    professorAppointments: Appointment[];
}