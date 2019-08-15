import { PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
import { type } from 'os';
import { Book } from './book.entity';
import { LibraryEventType } from './library-event-type.entity';

@Entity('library_event')
export class LibraryEvent {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.libraryEvents)
    user: User;

    @ManyToOne(type => Book, book => book.libraryEvents)
    book: Book;

    @ManyToOne(type => LibraryEventType, libraryEventType => libraryEventType.name)
    name: LibraryEventType;

    @CreateDateColumn()
    timestamp: Date;

}
