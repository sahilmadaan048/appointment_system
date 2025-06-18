import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../role.enum";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    
    @ApiProperty({enum: Role})
    @IsEnum(Role)
    role: Role;
}