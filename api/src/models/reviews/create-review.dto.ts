import { IsString, Length, IsEnum } from 'class-validator';
import { RatingTypeEnum } from '../../../src/common/enums/rating-type.enum';
import { string } from 'joi';
import { isString } from 'util';

export class CreateReviewDTO {

    // @IsString()
    // readonly ratingType: RatingTypeEnum;
    @IsEnum(RatingTypeEnum)
    readonly ratingType: RatingTypeEnum;

    @IsString()
    @Length(1, 2000)
    readonly comment: string;

}
