import { IsString, Length, IsEnum } from 'class-validator';
// import { RatingType } from 'src/data/entities/rating-type.entity';
import { string } from 'joi';
import { RatingTypeEnum } from 'src/common/enums/rating-type.enum';

export class UpdateReviewDTO {

    @IsString()
    readonly ratingType: RatingTypeEnum;
    // @IsEnum(string)
    // readonly ratingType: RatingTypeEnum;

    @IsString()
    @Length(1, 5000)
    readonly comment: string;

}
