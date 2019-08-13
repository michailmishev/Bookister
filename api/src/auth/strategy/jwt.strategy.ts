import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../../core/interfaces/jwt.payload';
import { UserShowDTO } from '../../models/user';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtSecret,
        });
    }

    async validate(payload: JwtPayload): Promise<UserShowDTO> {
        const user = await this.authService.findUserByUsername(payload.username);
        if (!user) {
            throw new Error(`Not authorized!`);
        }
        return await this.authService.validateUserFromPayload(payload);
    }
}
