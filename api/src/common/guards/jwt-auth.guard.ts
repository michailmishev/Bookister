import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlacklistService } from '../../auth/blacklist/blacklist.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly blacklistService: BlacklistService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    if (!super.canActivate(context)) {
      return false;
    }
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const isBlacklisted = await this.isBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async isBlacklisted(
    token: string,
  ): Promise<boolean> {
    const isBlacklisted: boolean = await this.blacklistService.checkIfBlacklisted(token);
    if (!!isBlacklisted) {
      return true;
    }
    return false;
  }
}
