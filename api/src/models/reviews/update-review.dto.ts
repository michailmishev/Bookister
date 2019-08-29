import { IsString, Length, IsEnum } from 'class-validator';
import { RatingType } from 'src/data/entities/rating-type.entity';

export class UpdateReviewDTO {

    @IsString()
    readonly rating: RatingType;

    @IsString()
    @Length(1, 5000)
    readonly comment: string;

}
