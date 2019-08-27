import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
import { UserShowDTO } from '../user';

@Exclude()
export class ShowReviewDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => UserShowDTO)
    user: UserShowDTO;

    @Expose()
    @IsString()
    rating: string;

    @Expose()
    @IsString()
    comment: string;

    @Expose()
    @IsDate()
    timestamp: Date;

}
