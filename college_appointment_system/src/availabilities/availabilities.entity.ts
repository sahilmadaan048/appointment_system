import { User } from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('timestamptz')
    startTime: Date;
    
    @Column('timestamptz')
    endTime: Date;

    @ManyToOne(() => User, (user) => user.availabilities)
    professor: User;
}