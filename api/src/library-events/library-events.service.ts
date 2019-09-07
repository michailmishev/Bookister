import { Injectable } from '@nestjs/common';
import { LibraryEvent } from 'src/data/entities/library-event.entity';
import { ShowLibraryEventDTO } from 'src/models/library-events/show-library-event.dto';
import { plainToClass } from 'class-transformer';
import { BorrowTypeEnum } from 'src/common/enums/borrow-type.enum';
import { async } from 'rxjs/internal/scheduler/async';
// import { BorrowType } from 'src/data/entities/borrow-type.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibraryEventDTO } from 'src/models/library-events/create-library-event.dto';
import { UserShowDTO } from 'src/models/user';
import { Book } from 'src/data/entities/book.entity';
import { User } from 'src/data/entities/user.entity';

@Injectable()
export class LibraryEventsService {

    constructor(
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        // @InjectRepository(BorrowType) private readonly borrowTypesRepository: Repository<BorrowType>,
        @InjectRepository(LibraryEvent) private readonly libraryEventsRepository: Repository<LibraryEvent>,
    ) { }

    async createLibraryEventDTO(libraryEvent: LibraryEvent): Promise<ShowLibraryEventDTO> {
        const libraryEventDTO = {
            id: libraryEvent.id,
            user: await libraryEvent.user,
            borrow: libraryEvent.borrowType,
            timestamp: libraryEvent.timestamp,
        };
        return await plainToClass(ShowLibraryEventDTO, libraryEventDTO);
    }

    // async checkForBorrowTypesAndCreateThem(): Promise<void> {
    //     const borrowTypes = [ BorrowTypeEnum.Taken, BorrowTypeEnum.Returned ];
    //     await borrowTypes.forEach(async (borrowType) => {
    //         if (!(await this.borrowTypesRepository.findOne({ name: borrowType }))) {
    //             const borrowTypeToBeCreated = await this.borrowTypesRepository.create({ name: borrowType });
    //             await this.borrowTypesRepository.save(borrowTypeToBeCreated);
    //         }
    //     });
    // }

    //
    // async takeOrReturnBook(newLibraryEvent: CreateLibraryEventDTO, bookId: string, user: UserShowDTO): Promise<ShowLibraryEventDTO> {
    //     const libraryEventToBeCreated = await this.libraryEventsRepository.create(newLibraryEvent);
    //     const bookOfTheLibraryEvent = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
    //     if (!bookOfTheLibraryEvent) {
    //         return undefined;
    //     }
    //     const author = await this.usersRepository.findOne({ username: user.username });
    //     libraryEventToBeCreated.book = Promise.resolve(bookOfTheLibraryEvent);
    //     libraryEventToBeCreated.user = Promise.resolve(author);
    //
    //     const createdLibraryEvent = await this.libraryEventsRepository.save(libraryEventToBeCreated);
    //     return this.createLibraryEventDTO(createdLibraryEvent);
    // }
    //

    async takeBook(newLibraryEvent: CreateLibraryEventDTO, bookId: string, user: UserShowDTO): Promise<ShowLibraryEventDTO> {
        const libraryEventToBeCreated = await this.libraryEventsRepository.create(newLibraryEvent);
        const bookOfTheLibraryEvent = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
        if (!bookOfTheLibraryEvent) {
            return undefined;
        }

        const author = await this.usersRepository.findOne({ username: user.username });
        libraryEventToBeCreated.book = Promise.resolve(bookOfTheLibraryEvent);
        libraryEventToBeCreated.user = Promise.resolve(author);

        const createdLibraryEvent = await this.libraryEventsRepository.save(libraryEventToBeCreated);
        return this.createLibraryEventDTO(createdLibraryEvent);
    }

    async returnBook(newLibraryEvent: CreateLibraryEventDTO, bookId: string, user: UserShowDTO): Promise<ShowLibraryEventDTO> {
        const libraryEventToBeCreated = await this.libraryEventsRepository.create(newLibraryEvent);
        const bookOfTheLibraryEvent = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
        if (!bookOfTheLibraryEvent) {
            return undefined;
        }

        const author = await this.usersRepository.findOne({ username: user.username });
        libraryEventToBeCreated.book = Promise.resolve(bookOfTheLibraryEvent);
        libraryEventToBeCreated.user = Promise.resolve(author);

        const createdLibraryEvent = await this.libraryEventsRepository.save(libraryEventToBeCreated);
        return this.createLibraryEventDTO(createdLibraryEvent);
    }

    async checkIfBookIsTaken(bookId: string): Promise<string> | undefined {
        const lastEventForThisBook: LibraryEvent = await this.libraryEventsRepository.findOne({
            where: {book: bookId},
            order: {id: 'DESC'}
        });
        if (!!lastEventForThisBook) {
            if (lastEventForThisBook.borrowType === BorrowTypeEnum.Taken) {
                return 'This book is already taken!';
            }
        }
    }

    async checkIfBookIsTakenByDifferentUser(bookId: string, userId: UserShowDTO ): Promise<string> | undefined {
        const lastEventForThisBook: LibraryEvent = await this.libraryEventsRepository.findOne({
            where: {book: bookId, borrowType: BorrowTypeEnum.Taken},
            order: {id: 'DESC'}
        });
        if (!!lastEventForThisBook) {
            const lastEventForThisBookPromise = this.createLibraryEventDTO(lastEventForThisBook);
            const lastEventForThisBookPromiseShowDto = await lastEventForThisBookPromise;
            if ((lastEventForThisBookPromiseShowDto.user.username) !== userId.username) {
                return 'This book is taken but not by the this user';
            }
        }

    }

}
