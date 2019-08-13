import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../../data/entities/user.entity';
import { UserLoginDTO, UserShowDTO, UserRegisterDTO } from '../../models/user';
import { JwtPayload } from '../interfaces/jwt.payload';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Banstatus } from '../../data/entities/banstatus.entity';
import { Role } from '../../data/entities/role.entity';
import { UserRole } from '../../common/enums/user-role.enum';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Banstatus) private readonly banstatusRepository: Repository<Banstatus>,
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
        const banstatus: Banstatus = await this.banstatusRepository.create();
        await this.banstatusRepository.save(banstatus);
        const role: Role = await this.rolesRepository.findOne({ name: UserRole.User });
        const passwordHash: string = await bcrypt.hash(user.password, 10);
        userForRegister.password = passwordHash;
        userForRegister.banstatus = banstatus;
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

    async deleteUser(userId: string): Promise<UserShowDTO> {
        const userToBeDeleted: User = await this.userRepository.findOne({ id: userId, isDeleted: false });
        userToBeDeleted.isDeleted = true;
        const deletedUser: User = await this.userRepository.save(userToBeDeleted);
        return plainToClass(UserShowDTO, deletedUser);
    }

    async banUser(userId: string, description: string): Promise<UserShowDTO> {
        const userToBeBanned: User = await this.userRepository.findOne({ id: userId, isDeleted: false });
        const banstatus: Banstatus = await userToBeBanned.banstatus;
        banstatus.isBanned = true;
        banstatus.description = description;
        this.banstatusRepository.save(banstatus);
        userToBeBanned.banstatus = banstatus;
        const bannedUser: User = await this.userRepository.save(userToBeBanned);
        return plainToClass(UserShowDTO, bannedUser);
    }

    async unbanUser(userId: string): Promise<UserShowDTO> {
        const userToBeUnbanned: User = await this.userRepository.findOne({ id: userId, isDeleted: false });
        const banstatus: Banstatus = await userToBeUnbanned.banstatus;
        banstatus.isBanned = false;
        banstatus.description = 'This user is not banned!';
        this.banstatusRepository.save(banstatus);
        userToBeUnbanned.banstatus = banstatus;
        const unbannedUser: User = await this.userRepository.save(userToBeUnbanned);
        return plainToClass(UserShowDTO, unbannedUser);
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
