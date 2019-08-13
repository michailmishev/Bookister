import { createParamDecorator, CanActivate, ExecutionContext } from '@nestjs/common';

export class BanstatusGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userBanstatus = request.user.banstatus;
        if (userBanstatus.isBanned === true) {
            return false;
        }
        return true;
    }
}
