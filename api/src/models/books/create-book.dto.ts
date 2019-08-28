import { IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateBookDTO {

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 50)
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    readonly topic: string;

    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    readonly language: string;


    //
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    readonly averageRating: string;
    //



}
