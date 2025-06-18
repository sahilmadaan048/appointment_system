import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('timestamptz')
    timeSlot: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.studentAppointments)
    student: User;
    
    
    @ManyToOne(() => User, (user) => user.professorAppointments)
    professor: User;
}