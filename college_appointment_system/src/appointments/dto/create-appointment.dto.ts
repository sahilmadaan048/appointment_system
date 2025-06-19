import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNumber } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsNumber()
    professorId: number;

    @ApiProperty({description: 'ISO date-time string of desired slot'})
    @IsISO8601()
    timeSlot: string;
}