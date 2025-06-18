import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiOperation({summary: 'Register as Student or Professor'})
    async register(@Body() dto: RegisterDto) {
        const user = await this.authService.register(dto.name, dto.email, dto.password, dto.role);
        const {password, ...result} = user;
        return result;
    }

    @Post('login')
    @ApiOperation({summary: 'Login and receive JWT Token'})
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }
}
