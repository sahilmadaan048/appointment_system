import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@ApiTags()@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(name: string, email: string, password: string, role: string) {
        return this.usersService.create(name, email, password, role);
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
    