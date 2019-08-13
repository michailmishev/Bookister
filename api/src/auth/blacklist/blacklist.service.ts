import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blacklist } from '../../data/entities/blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
    constructor(
        @InjectRepository(Blacklist) private readonly blacklistRepository: Repository<Blacklist>,
    ) { }

    async blacklist(token: string): Promise<string> {
        const tokenToBeBlacklisted = new Blacklist();
        tokenToBeBlacklisted.token = token;
        await this.blacklistRepository.save(tokenToBeBlacklisted);
        await this.removeOldBlacklistedTokens();
        return token.split(' ')[1];
    }

    async checkIfBlacklisted(token: string): Promise<boolean> {
        const isBlacklisted: Blacklist = await this.blacklistRepository.findOne({token});
        await this.removeOldBlacklistedTokens();
        if (!isBlacklisted) {
            return false;
        }
        return true;
    }

    async removeOldBlacklistedTokens(): Promise<void> {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 1);
        const allBlacklistedTokens = await this.blacklistRepository.find();
        allBlacklistedTokens.forEach(async (token: Blacklist) => {
            if (token.date < currentDate) {
                await this.blacklistRepository.delete({id: token.id});
            }
        });
    }
}
