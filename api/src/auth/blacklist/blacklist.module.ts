import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistService } from './blacklist.service';
import { Blacklist } from '../../data/entities/blacklist.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blacklist])],
    providers: [BlacklistService],
    exports: [BlacklistService],
})
export class BlacklistModule {}
