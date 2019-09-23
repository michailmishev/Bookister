import { Expose, Exclude } from 'class-transformer';
import { IsString, IsDate, IsBoolean } from 'class-validator';

@Exclude()
export class ShowBookWithoutReviewsDTO {

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
    language: string;

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
    @IsString()
    takenBy: string;

}
