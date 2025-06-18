import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { AvailabilitiesService } from './availabilities.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Role } from 'src/auth/role.enum';

@ApiTags('availability')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('availabilities')
export class AvailabilitiesController {
    constructor(private availService: AvailabilitiesService) {}

    @Post()
    @Roles(Role.Professor)
    @ApiOperation( { summary: 'Create availability slot (Prof only)' } )
    async create(@Req() req, @Body() dto: CreateAvailabilityDto) {
        const professorId = req.user.userId;
        return this.availService.create(professorId, dto);
    }

    @Get()
    @ApiOperation( {summary: 'Get availability slots by professor ID'} )
    async findByProfessor(@Query('proefessorId') professorId: string)  {
        return this.availService.findByProfessor(+professorId);
    }    

}
