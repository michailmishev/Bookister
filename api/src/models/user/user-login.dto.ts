import { IsString, Matches } from 'class-validator';

export class UserLoginDTO {
    @IsString()
    username: string;

    @IsString()
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
    password: string;
}
