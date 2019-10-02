import { PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity, Column } from 'typeorm';
import { User } from './user.entity';
// import { type } from 'os';
import { Book } from './book.entity';
import { BorrowTypeEnum } from '../../../src/common/enums/borrow-type.enum';

@Entity('library_event')
export class LibraryEvent {

    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.libraryEvents)
    user: Promise<User>;

    @ManyToOne(type => Book, book => book.libraryEvents)
    book: Promise<Book>;

    //
    @Column({
        type: 'enum',
        enum: BorrowTypeEnum,
    })
    borrowType: BorrowTypeEnum;            // Taken / Returned

    @CreateDateColumn()
    timestamp: Date;

}
