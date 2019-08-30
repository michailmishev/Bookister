import { Controller, Post, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe, Param, Body, NotFoundException } from '@nestjs/common';
import { LibraryEventsService } from './library-events.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { async } from 'rxjs/internal/scheduler/async';
import { UserShowDTO } from 'src/models/user';
import { CreateBookDTO } from 'src/models/books/create-book.dto';
import { CreateLibraryEventDTO } from 'src/models/library-events/create-library-event.dto';
import { User } from '../common/decorators/user.decorator';

@Controller('books')
export class LibraryEventsController {

    constructor(
        private readonly libraryEventsService: LibraryEventsService,
    ) { }



    @Post('/:bookId/libraryEvents')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async takeBook(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Body() libraryEvent1: CreateLibraryEventDTO,
    ): Promise<any> {
        await this.libraryEventsService.checkForBorrowTypesAndCreateThem();
        const createdLibraryEvent = await this.libraryEventsService.takeBook(libraryEvent1, bookId, user);
        if (!createdLibraryEvent) {
                throw new NotFoundException('This book was not found.');
        }
        // if book is taken: ...
        return {
            message: 'Book has been taken successfully!',
            data: createdLibraryEvent,
        };
    }



}
