import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../../data/entities/user.entity';
import { UserLoginDTO, UserShowDTO, UserRegisterDTO } from '../../models/user';
import { JwtPayload } from '../interfaces/jwt.payload';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Role } from '../../data/entities/role.entity';
import { UserRole } from '../../common/enums/user-role.enum';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    ) { }

    async findUsername(username: string): Promise<UserShowDTO> | undefined {
        const userEntity: User = await this.userRepository.findOne({ username, isDeleted: false });
        if (!!userEntity) {
            return plainToClass(UserShowDTO, userEntity);
        }
    }

    async findEmail(email: string): Promise<string> | undefined {
        const userWithThatEmail: User = await this.userRepository.findOne({ email });
        if (!!userWithThatEmail) {
            return userWithThatEmail.email;
        }
    }

    async getUserByUsername(username: string): Promise<User> | undefined {
        const userEntity: User = await this.userRepository.findOne({ username, isDeleted: false });
        if (!!userEntity) {
            return userEntity;
        }
    }

    async getUserById(userId: string): Promise<User> | undefined {
        const userEntity: User = await this.userRepository.findOne({ id: userId, isDeleted: false });
        if (!!userEntity) {
            return userEntity;
        }
    }

    async checkForRolesAndCreateThem(): Promise<void> {
        const roles = [UserRole.User, UserRole.Admin];
        await roles.forEach(async (role: string) => {
            if (!(await this.rolesRepository.findOne({ name: role }))) {
                const roleToBeCreated = await this.rolesRepository.create({ name: role });
                await this.rolesRepository.save(roleToBeCreated);
            }
        });
    }

    async register(user: UserRegisterDTO): Promise<UserShowDTO> | undefined {
        const userForRegister: User = await this.userRepository.create(user);
        const role: Role = await this.rolesRepository.findOne({ name: UserRole.User });
        const passwordHash: string = await bcrypt.hash(user.password, 10);
        userForRegister.password = passwordHash;
        userForRegister.roles = [role];
        const registeredUser: User = await this.userRepository.save(userForRegister);
        return plainToClass(UserShowDTO, registeredUser);
    }

    async validateUserPassword(user: UserLoginDTO): Promise<UserShowDTO> | undefined {
        const userEntity: User = await this.userRepository.findOne({ username: user.username, isDeleted: false });
        const isValidated: boolean = await bcrypt.compare(user.password, userEntity.password);
        if (isValidated) {
            return plainToClass(UserShowDTO, userEntity);
        }
    }

    async validateUserFromPayload(payload: JwtPayload): Promise<UserShowDTO> | undefined {
        const userEntity: UserShowDTO = await this.findUsername(payload.username);
        if (!!userEntity) {
            return userEntity;
        }
    }

    async getUsers(): Promise<UserShowDTO[]> {
        const users: UserShowDTO[] = await this.userRepository.find({ isDeleted: false });
        return plainToClass(UserShowDTO, users);
    }

    async getUser(userId: string): Promise<UserShowDTO> {
        const user: UserShowDTO = await this.userRepository.findOne({ id: userId, isDeleted: false });
        return plainToClass(UserShowDTO, user);
    }
}
