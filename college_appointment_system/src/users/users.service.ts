import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
    ) { }


    async create(name: string, email: string, password: string, role: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);
        const roleEnum = role === 'student' ? Role.Student : Role.Professor;

        const user = this.usersRepo.create({ name, email, password: hash, role: roleEnum });
        return this.usersRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepo.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepo.findOne({ where: { id } });
    }
}
