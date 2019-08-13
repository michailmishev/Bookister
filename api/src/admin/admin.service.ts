import { Injectable } from '@nestjs/common';
import { UserShowDTO } from '../models/user';
import { UsersService } from '../core/services/users.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AdminService {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    async deleteUser(userId: string): Promise<UserShowDTO> {
        return await this.usersService.deleteUser(userId);
    }

    async banUser(userId: string, description: string): Promise<UserShowDTO> {
        return await this.usersService.banUser(userId, description);
    }

    async unbanUser(userId: string): Promise<UserShowDTO> {
        return await this.usersService.unbanUser(userId);
    }

    async findUserById(userId: string): Promise<UserShowDTO> | undefined {
        const foundUserById = await this.usersService.getUserById(userId);
        return plainToClass(UserShowDTO, foundUserById);
    }
}
