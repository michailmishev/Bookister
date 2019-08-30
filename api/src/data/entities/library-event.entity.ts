import { PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
// import { type } from 'os';
import { Book } from './book.entity';
import { BorrowType } from './borrow-type.entity';

@Entity('library_event')
export class LibraryEvent {

    // @PrimaryGeneratedColumn('uuid')
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.libraryEvents)
    user: Promise<User>;

    @ManyToOne(type => Book, book => book.libraryEvents)
    book: Promise<Book>;

    @ManyToOne(type => BorrowType, borrowType => borrowType.name)
    borrow: BorrowType;

    @CreateDateColumn()
    timestamp: Date;

}
