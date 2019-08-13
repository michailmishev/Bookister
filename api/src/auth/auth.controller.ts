import { Controller, Post, Body, ValidationPipe, BadRequestException, UseGuards, Delete, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, UserRegisterDTO } from '../models/user';
import { Token } from '../common/decorators/token.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('session')
    async login(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) user: UserLoginDTO,
    ): Promise<any> | undefined {
        if (
            !(await this.authService.findUserByUsername(user.username)) ||
            !(await this.authService.validateUserPassword(user))
        ) {
            throw new BadRequestException('Invalid username or password!');
        }
        const userData = await this.authService.login(user);
        return {
            message: 'Successful login!',
            data: userData,
        };
    }

    @Delete('session')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async logout(
        @Token() token: string,
    ): Promise<any> | undefined {
        const tokenForBlacklisting: string = token;
        const logOutData = await this.authService.logout(tokenForBlacklisting);
        if (!!logOutData) {
            return {
                message: 'Successful logout!',
                data: logOutData,
            };
        }
        return undefined;
    }

    @Post('users')
    async register(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        })) user: UserRegisterDTO,
    ): Promise<any> | undefined {

        await this.authService.checkForRolesAndCreateThem();
        const userExistsInTheDatabase = await this.authService.findUserByUsername(user.username);
        if (userExistsInTheDatabase) {
            throw new BadRequestException('This username is taken!');
        }
        const emailExistsInTheDatabase = await this.authService.findEmailInTheDatabase(user.email);
        if (emailExistsInTheDatabase) {
            throw new BadRequestException('This email is taken!');
        }
        const userData = await this.authService.register(user);
        return {
            message: 'Successful registration!',
            data: userData,
        };
    }

    @Get('users')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async getUsers() {
        return await this.authService.getUsers();
    }

    @Get('users/:id')
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async getUser(
        @Param('id') userId: string,
    ) {
        return await this.authService.getUser(userId);
    }
}
