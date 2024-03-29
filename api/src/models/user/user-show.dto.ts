import { IsString, IsDefined } from 'class-validator';
import 'class-transformer';
import { Expose, Exclude, Type } from 'class-transformer';
import { BanstatusShowDTO } from '../banstatus/banstatus-show.dto';
import { RoleShowDTO } from '../roles/role-show.dto';

@Exclude()
export class UserShowDTO {
    @Expose()
    @IsString()
    id: string;
    @Expose()
    @IsString()
    username: string;
    @Expose()
    isDeleted: boolean;
    @Expose()
    @Type(() => BanstatusShowDTO)
    @IsDefined()
    banstatus: BanstatusShowDTO;
    @Expose()
    @Type(() => RoleShowDTO)
    @IsDefined()
    roles: RoleShowDTO[];
}
