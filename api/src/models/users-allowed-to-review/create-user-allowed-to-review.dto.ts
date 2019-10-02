import { IsBoolean, IsEnum } from 'class-validator';

export class CreateUserAllowedToReviewDTO {

    @IsBoolean()
    readonly isAllowedToReview: boolean;

}
