import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
import { UserShowDTO } from '../user';
import { ShowBookWithoutReviewsDTO } from '../books/show-book-without-reviews.dto';

@Exclude()
export class ShowLibraryEventDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => UserShowDTO)
    user: UserShowDTO;

    // @Expose()
    // @Type(() => ShowBookWithoutReviewsDTO )                     // ? ? ? Do I need book? Is it right tht way?
    // book: ShowBookWithoutReviewsDTO;

    @Expose()
    @IsString()
    borrow: string;

    @Expose()
    @IsDate()
    timestamp: Date;

}
