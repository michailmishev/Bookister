import { IsString, Length, IsEnum } from 'class-validator';
import { RatingTypeEnum } from '../../common/enums/rating-type.enum';
import { string } from 'joi';
import { isString } from 'util';
import { RatingType } from 'src/data/entities/rating-type.entity';

export class CreateReviewDTO {

    // @IsEnum(string)
    // readonly rating: RatingTypeEnum;
    @IsString()                             // (string) IS IT RIGHT ? ? 
    readonly rating: RatingType;

    @IsString()
    @Length(1, 2000)
    readonly comment: string;

}
