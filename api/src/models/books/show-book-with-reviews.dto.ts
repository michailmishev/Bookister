import { Expose, Exclude, Type } from 'class-transformer';
import { IsString, IsDate, IsBoolean } from 'class-validator';
import { ShowReviewDTO } from '../reviews/show-review.dto';

@Exclude()
export class ShowBookWithReviewsDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    title: string;

    @Expose()
    @IsString()
    author: string;

    @Expose()
    @IsString()
    topic: string;

    @Expose()
    @IsString()
    laguage: string;

    @Expose()
    @IsDate()
    timestamp: Date;

    @Expose()
    @IsString()
    averageRating: string;

    @Expose()
    @IsBoolean()
    isTaken: boolean;

    @Expose()
    @Type(() => ShowReviewDTO)                  //  ReviewDTO - NOT Ready yet!
    review: ShowReviewDTO[];

}
