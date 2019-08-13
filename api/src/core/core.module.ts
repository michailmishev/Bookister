import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../data/entities/user.entity';
import { Banstatus } from 'src/data/entities/banstatus.entity';
import { Role } from '../data/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Banstatus, Role])],
  providers: [UsersService],
  exports: [UsersService],
})
export class CoreModule { }
