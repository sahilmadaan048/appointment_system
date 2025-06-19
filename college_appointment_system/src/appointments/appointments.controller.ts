import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { AppointmentsService } from './appointments.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateAvailabilityDto } from 'src/availabilities/dto/create-availability.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
    constructor(private apptService: AppointmentsService) {} 
    
    @Post()
    @Roles(Role.Student)
    @ApiOperation({summary: 'Book an appointment (Student only)'})
    async book(@Req() req, @Body() dto: CreateAppointmentDto) {
        const studentId = req.user.userId;
        return this.apptService.book(studentId, dto);
    }

    @Get()
    @Roles(Role.Student, Role.Professor)
    @ApiOperation({summary: 'View your active apppointments'})
    async myAppointments(@Req() req) {
        return this.apptService.findForUser(req.user.userId, req.user.role);
    }

    @Patch(':id/cancel')
    @Roles(Role.Professor)
    async cancel(@Req() req, @Param('id') id: string) {
        const professorId = req.user.userId;
        return this.apptService.cancel(professorId, +id);
    }

}
