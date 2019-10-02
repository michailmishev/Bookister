import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { UserShowDTO } from '../user';
import { ShowBookWithoutReviewsDTO } from '../books/show-book-without-reviews.dto';

@Exclude()
export class ShowUserAllowedToReviewDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => UserShowDTO)
    user: UserShowDTO;

    //
    // @Expose()
    // @Type(() => ShowBookWithoutReviewsDTO )
    // book: ShowBookWithoutReviewsDTO;
    //

    @Expose()
    @IsDate()
    timestamp: Date;

}
