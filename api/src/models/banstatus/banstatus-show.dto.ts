import { IsString, IsBoolean } from 'class-validator';
import 'class-transformer';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class BanstatusShowDTO {
    @Expose()
    @IsBoolean()
    isBanned: boolean;
    @Expose()
    @IsString()
    description: string;
}
