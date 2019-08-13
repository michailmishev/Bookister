import { IsString } from 'class-validator';
import 'class-transformer';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class BanstatusCreateDTO {
    @Expose()
    @IsString()
    description: string;
}
