import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/services/users.service';
import { UserLoginDTO, UserShowDTO, UserRegisterDTO } from '../models/user';
import { JwtPayload } from '../core/interfaces/jwt.payload';
import { BlacklistService } from './blacklist/blacklist.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly blacklistService: BlacklistService,
    ) { }

    async register(user: UserRegisterDTO): Promise<UserShowDTO> | undefined {
        return await this.usersService.register(user);
    }

    async login(user: UserLoginDTO): Promise<string> {
        const userFound: UserShowDTO = await this.findUserByUsername(user.username);
        if (userFound) {

            return await this.jwtService.signAsync({...userFound});

        }
        return null;
    }

    async logout(token: string): Promise<any> {
        return await this.blacklistService.blacklist(token);
    }

    async findUserByUsername(username: string): Promise<UserShowDTO> | undefined {
        return await this.usersService.findUsername(username);
    }

    async findEmailInTheDatabase(email: string): Promise<string> | undefined {
        return this.usersService.findEmail(email);
    }

    async validateUserPassword(user: UserLoginDTO): Promise<UserShowDTO> | undefined {
        return await this.usersService.validateUserPassword(user);
    }

    async validateUserFromPayload(payload: JwtPayload): Promise<UserShowDTO> | undefined {
        return await this.usersService.validateUserFromPayload(payload);
    }

    async isTokenBlacklisted(token: string) {
        return await this.blacklistService.checkIfBlacklisted(token);
    }

    async checkForRolesAndCreateThem(): Promise<void> {
        await this.usersService.checkForRolesAndCreateThem();
    }

    async getUsers(): Promise<UserShowDTO[]> {
        return await this.usersService.getUsers();
    }

    async getUser(userId: string): Promise<UserShowDTO> {
        return await this.usersService.getUser(userId);
    }
}
