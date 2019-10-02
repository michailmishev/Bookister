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
import { UserAlloweToReview } from 'src/data/entities/user-allowed-to-review.entity';
import { ShowUserAllowedToReviewDTO } from 'src/models/users-allowed-to-review/show-user-allowed-to-review.dto';
import { CreateUserAllowedToReviewDTO } from 'src/models/users-allowed-to-review/create-user-allowed-to-review.dto';

@Injectable()
export class LibraryEventsService {

    constructor(
        @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        // @InjectRepository(BorrowType) private readonly borrowTypesRepository: Repository<BorrowType>,
        @InjectRepository(LibraryEvent) private readonly libraryEventsRepository: Repository<LibraryEvent>,
        @InjectRepository(UserAlloweToReview) private readonly reviewPermissionRepository: Repository<UserAlloweToReview>,
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


    // -----------------------------
    async createReviewPermission(bookId: string, user: UserShowDTO): Promise<string> | undefined {
        const existingReviewPermission: UserAlloweToReview = await this.reviewPermissionRepository.findOne({
            where: {book: bookId, user: user}
        });
        if (!!existingReviewPermission) {
            return 'Review Permission Already Exist!';
        } else {
            const allowedToReview: CreateUserAllowedToReviewDTO = { isAllowedToReview: true };
            const reviewPermissionToBeCreated = await this.reviewPermissionRepository.create(allowedToReview);

            const bookOfReviewPrmission = await this.booksRepository.findOne({ id: bookId, isDeleted: false });
            if (!bookOfReviewPrmission) {
                return undefined;
            }

            const author = await this.usersRepository.findOne({ username: user.username });

            reviewPermissionToBeCreated.book = Promise.resolve(bookOfReviewPrmission);
            reviewPermissionToBeCreated.user = Promise.resolve(author);

            const createdReviewPermission = await this.reviewPermissionRepository.save(reviewPermissionToBeCreated);
            if (!!this.createReviewPermission) {
                return 'Review Permission successfully added!';
            }
        }
    }
    // -----------------------------

    // async updateReviewPermission(bookId: string, user: UserShowDTO): Promise<string> | undefined {
    //     const reviewPermissionToBeUpdated = await this.reviewPermissionRepository.findOne({
    //         where: {book: bookId, user: user}
    //     });
    //     if (!!reviewPermissionToBeUpdated) {
    //         if (reviewPermissionToBeUpdated.isAllowedToReview === false) {
    //             reviewPermissionToBeUpdated.isAllowedToReview = true;
    //         } else if (reviewPermissionToBeUpdated.isAllowedToReview === true) {
    //             reviewPermissionToBeUpdated.isAllowedToReview = false;
    //         }
    //         const updatedReviewPermission = await this.reviewPermissionRepository.save(reviewPermissionToBeUpdated);
    //         if (!!updatedReviewPermission) {
    //             return 'Review Permission successfully updated!';
    //         }
    //     }
    // }
    // -----------------------------



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
