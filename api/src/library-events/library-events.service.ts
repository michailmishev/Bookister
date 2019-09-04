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


    // async createLibraryEventDTO(libraryEvent: LibraryEvent): Promise<ShowLibraryEventDTO> {
    //     const libraryEventDTO = {
    //         id: libraryEvent.id,
    //         user: await libraryEvent.user,
    //         borrow: libraryEvent.borrow,
    //         timestamp: libraryEvent.timestamp,
    //     };
    //     return await plainToClass(ShowLibraryEventDTO, libraryEventDTO);
    // }

    // async checkForBorrowTypesAndCreateThem(): Promise<void> {
    //     const borrowTypes = [ BorrowTypeEnum.Taken, BorrowTypeEnum.Returned ];
    //     await borrowTypes.forEach(async (borrowType) => {
    //         if (!(await this.borrowTypesRepository.findOne({ name: borrowType }))) {
    //             const borrowTypeToBeCreated = await this.borrowTypesRepository.create({ name: borrowType });
    //             await this.borrowTypesRepository.save(borrowTypeToBeCreated);
    //         }
    //     });
    // }


    // async takeBook(newLibraryEvent: CreateLibraryEventDTO, bookId: string, user: UserShowDTO): Promise<ShowLibraryEventDTO> {
    //     const libraryEventToBeCreated = await this.libraryEventsRepository.create(newLibraryEvent);
    //     const bookOfTheLibraryEvent = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
    //     if (!bookOfTheLibraryEvent) {
    //         return undefined;
    //     }
    //     const author = await this.usersRepository.findOne({ username: user.username });
    //     libraryEventToBeCreated.book = Promise.resolve(bookOfTheLibraryEvent);
    //     libraryEventToBeCreated.user = Promise.resolve(author);
    //     const createdLibraryEvent = await this.libraryEventsRepository.save(libraryEventToBeCreated);
    //     return this.createLibraryEventDTO(createdLibraryEvent);
    // }






    // async returnBook(libraryEvent2: CreateLibraryEventDTO, libraryEventId: string, user: any): Promise<ShowLibraryEventDTO> {
    //     const libraryEventToBeUpdated = await this.libraryEventsRepository.findOne({ id: libraryEventId });
    //     if (!libraryEventToBeUpdated) {
    //         return undefined;
    //     }
    //     libraryEventToBeUpdated.borrow = libraryEvent2.borrow;
    //     const updatedLibraryEvent = await this.libraryEventsRepository.save(libraryEventToBeUpdated);
    //     return this.createLibraryEventDTO(updatedLibraryEvent);
    // }



    // async showLibraryEvent(libraryEventId: string): Promise<ShowLibraryEventDTO | undefined> {
    //     const libraryEvent = await this.libraryEventsRepository.findOne({ id: libraryEventId });
    //     if (!!libraryEvent) {
    //         return this.createLibraryEventDTO(libraryEvent);
    //     } else {
    //         return undefined;
    //     }
    // }
    



    // async checkIfBookIsTaken() {

    // }


    // async checkIfBookIsTakenByTheUser() {

    // }



  







}
