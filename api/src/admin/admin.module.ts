import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
