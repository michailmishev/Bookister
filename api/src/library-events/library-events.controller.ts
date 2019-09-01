import { Controller, Post, HttpCode, HttpStatus, UseGuards, UsePipes, ValidationPipe, Param, Body, NotFoundException, Put, UnauthorizedException, Get } from '@nestjs/common';
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


    
    @Put('/:bookId/libraryEvents/:libraryEventId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    async returnBook(
        @User() user: UserShowDTO,
        @Param('bookId') bookId: string,
        @Param('libraryEventId') libraryEventId: string,
        @Body() libraryEvent2: UpdateLibraryEventDTO,
    ): Promise<any> {
        const libraryEventToBeUpdated = this.showLibraryEvent(libraryEventId);
        if (!libraryEventToBeUpdated) {
            throw new NotFoundException('LibraryEvent not found!');
        } else if ((await libraryEventToBeUpdated).user.username !== user.username) {
            throw new UnauthorizedException('Unauthorized operation (Book is not taken by the current user)!');
        }
        const createdLibraryEvent = await this.libraryEventsService.returnBook(libraryEvent2, libraryEventId, user);
        return {
            message: 'Book has been returned successfully!',
            data: createdLibraryEvent,
        };
    }


    @Get('/:bookId/libraryEvents/:libraryEventId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
    async showLibraryEvent(
        @Param('libraryEventId') libraryEventId: string,
    ): Promise<ShowLibraryEventDTO> {
        const libraryEvent3 = await this.libraryEventsService.showLibraryEvent(libraryEventId);
        if (!libraryEvent3) {
            throw new NotFoundException('LibraryEvent not found!');
        }
        return await libraryEvent3;
    }


}
