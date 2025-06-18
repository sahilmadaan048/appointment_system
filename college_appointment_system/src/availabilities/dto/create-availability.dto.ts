import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601 } from "class-validator";

export class CreateAvailabilityDto {
    @ApiProperty({description: 'ISO date-time string'})
    @IsISO8601()
    startTime: string;
    
    @ApiProperty({description: 'ISO date-time string'})
    @IsISO8601()
    endTime: string;
}