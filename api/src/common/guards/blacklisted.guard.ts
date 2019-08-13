import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BlacklistService } from '../../auth/blacklist/blacklist.service';

@Injectable()
export class BlacklistedGuard implements CanActivate {
    constructor(
        private readonly blacklistService: BlacklistService,
    ) {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const isBlacklisted: boolean = await this.blacklistService.checkIfBlacklisted(request.headers.authorization);
        if (!!isBlacklisted) {
            return false;
        }
        return true;
    }
}
