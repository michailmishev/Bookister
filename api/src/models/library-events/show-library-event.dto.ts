import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { UserShowDTO } from '../user';
import { ShowBookWithoutReviewsDTO } from '../books/show-book-without-reviews.dto';
import { BorrowTypeEnum } from '../../../src/common/enums/borrow-type.enum';
import { string } from 'joi';

@Exclude()
export class ShowLibraryEventDTO {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @Type(() => UserShowDTO)
    user: UserShowDTO;

    // @Expose()
    // @Type(() => ShowBookWithoutReviewsDTO )                     // ? ? ? Do I need book?
    // book: ShowBookWithoutReviewsDTO;

    @Expose()
    @IsEnum(string)
    borrow: BorrowTypeEnum;

    @Expose()
    @IsDate()
    timestamp: Date;

}
