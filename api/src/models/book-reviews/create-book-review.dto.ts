import { IsString, Length, IsEnum } from 'class-validator';
import { RatingTypeEnum } from '../../common/enums/rating-type.enum';
import { string } from 'joi';

export class CreateBookReviewDTO {

    @IsEnum(string)                             // (string) IS IT RIGHT ? ? ?
    readonly rating: RatingTypeEnum;

    @IsString()
    @Length(1, 2000)
    readonly comment: string;

}
