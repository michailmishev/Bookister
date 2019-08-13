import { Controller, Delete, UseGuards, Param, Put, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserShowDTO } from '../models/user';
import { AdminService } from './admin.service';
import { BanstatusCreateDTO } from '../models/banstatus/banstatus-create.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { BanstatusGuard } from '../common/guards/banstatus.guard';

@Controller()
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) {}

    @Delete('users/:userId')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard, BanstatusGuard)
    async deleteUser(
        @Param('userId') userId: string,
    ): Promise<any> {
        if (
            !(await this.adminService.findUserById(userId))
        ) {
            throw new BadRequestException('This user does not exist!');
        }
        return {message: 'User successfully deleted!',
            data: await this.adminService.deleteUser(userId),
        };
    }

    @Put('users/:userId/banstatus')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard, BanstatusGuard)
    async banUser(
        @Param('userId') userId: string,
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        }))  description: BanstatusCreateDTO,
    ): Promise<any> {
        if (
            !(await this.adminService.findUserById(userId))
        ) {
            throw new BadRequestException('This user does not exist!');
        }
        return {
            message: 'User successfully banned!',
            data: await this.adminService.banUser(userId, description.description),
        };
    }

    @Delete('users/:userId/banstatus')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard, RolesGuard, BanstatusGuard)
    async unbanUser(
        @Param('userId') userId: string,
    ): Promise<any> {
        if (
            !(await this.adminService.findUserById(userId))
        ) {
            throw new BadRequestException('This user does not exist!');
        }
        return {
            message: 'User successfully unbanned!',
            data: await this.adminService.unbanUser(userId),
        };
    }
}
