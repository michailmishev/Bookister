import { IsString, Length, IsEnum } from 'class-validator';
// import { BorrowType } from 'src/data/entities/borrow-type.entity';
import { BorrowTypeEnum } from '../../../src/common/enums/borrow-type.enum';

export class UpdateLibraryEventDTO {

    // @IsString()                             // (string) IS IT RIGHT ? ? 
    // readonly borrow: BorrowType;
    @IsEnum(BorrowTypeEnum)
    readonly borrow: BorrowTypeEnum;

}
