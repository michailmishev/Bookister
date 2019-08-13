import { IsString } from 'class-validator';
import 'class-transformer';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class RoleShowDTO {
    @Expose()
    @IsString()
    name: string;
}
