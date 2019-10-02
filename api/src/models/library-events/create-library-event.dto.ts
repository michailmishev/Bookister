import { IsString, Length, IsEnum } from 'class-validator';
import { BorrowTypeEnum } from '../../../src/common/enums/borrow-type.enum';

export class CreateLibraryEventDTO {

    @IsEnum(BorrowTypeEnum)
    readonly borrowType: BorrowTypeEnum;

}
