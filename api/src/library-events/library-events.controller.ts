import { Controller, Post, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe, Param, Body, NotFoundException, Put, UnauthorizedException, Get, BadRequestException } from '@nestjs/common';
import { LibraryEventsService } from './library-events.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { async } from 'rxjs/internal/scheduler/async';
import { UserShowDTO } from 'src/models/user';
import { CreateBookDTO } from 'src/models/books/create-book.dto';
import { CreateLibraryEventDTO } from 'src/models/library-events/create-library-event.dto';
import { User } from '../common/decorators/user.decorator';
import { UpdateLibraryEventDTO } from 'src/models/library-events/update-library-event.dto';
import { ShowLibraryEventDTO } from 'src/models/library-events/show-library-event.dto';
import { BorrowTypeEnum } from 'src/common/enums/borrow-type.enum';

@Controller('books')
export class LibraryEventsController {

    constructor(
        private readonly libraryEventsService: LibraryEventsService,
    ) { }

    // @Post('/:bookId/libraryEvents')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    // @UsePipes(
    //     new ValidationPipe({
    //         transform: true,
    //         whitelist: true,
    //     }),
    // )
    // async takeOrReturnBook(
    //     @User() user: UserShowDTO,
    //     @Param('bookId') bookId: string,
    //     @Body() libraryEvent1: CreateLibraryEventDTO,
    // ): Promise<any> {
    //     // await this.libraryEventsService.checkForBorrowTypesAndCreateThem();
    //     const createdLibraryEvent = await this.libraryEventsService.takeOrReturnBook(libraryEvent1, bookId, user);
    //     if (!createdLibraryEvent) {
    //             throw new NotFoundException('This book was not found.');
    //     }
    //     // if book is taken: ...
    //     return {
    //         message: 'Book has been taken/returned successfully!',
    //         data: createdLibraryEvent,
    //     };
    // }

    @Post('/:bookId/libraryEvents')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async takeOrReturnBook(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Body() libraryEvent1: CreateLibraryEventDTO,
    ): Promise<any> {
        // await this.libraryEventsService.checkForBorrowTypesAndCreateThem();
        // TAKE BOOK
        if (libraryEvent1.borrowType === BorrowTypeEnum.Taken) {

            const checkIfThisBookIsTaken = await this.libraryEventsService.checkIfBookIsTaken(bookId);
            if (checkIfThisBookIsTaken) {
                throw new BadRequestException('This book is already taken');
            }

            const createdTakeEvent = await this.libraryEventsService.takeBook(libraryEvent1, bookId, user);
            if (!createdTakeEvent) {
                throw new NotFoundException('This book was not found!');
            }

            return {
                message: 'Book has been taken successfully!',
                data: createdTakeEvent,
            };

        // RETURN BOOK
        } else if (libraryEvent1.borrowType === BorrowTypeEnum.Returned) {

            const checkIfThisBookIsTaken = await this.libraryEventsService.checkIfBookIsTaken(bookId);
            if (!checkIfThisBookIsTaken) {
                throw new BadRequestException('You cannot return a book that is not taken!');
            }

            const checkIfUserIsNotTheOneTakenTheBook = await this.libraryEventsService.checkIfBookIsTakenByDifferentUser(bookId, user);
            if (checkIfUserIsNotTheOneTakenTheBook) {
                throw new BadRequestException('You cannot return a book that is not taken by you');
            }

            const createdReturnEvent = await this.libraryEventsService.returnBook(libraryEvent1, bookId, user);
            if (!createdReturnEvent) {
                throw new NotFoundException('This book was not found!');
            }

            return {
                message: 'Book has been returned successfully!',
                data: createdReturnEvent,
            };
        }
    }

}
