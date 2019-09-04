import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { UserShowDTO } from '../user';
import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';
import { string } from 'joi';

@Exclude()
export class ShowReviewDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => UserShowDTO)
    user: UserShowDTO;

    //
    @Expose()
    @IsString()
    rating: RatingTypeEnum;
    //
    // @Expose()
    // @IsEnum(string)
    // ratingType: RatingTypeEnum;
    //

    @Expose()
    @IsString()
    comment: string;

    @Expose()
    @IsDate()
    timestamp: Date;

}
