import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { boolean } from 'joi';
import { LibraryEvent } from './library-event.entity';
import { BookReview } from './book-review.entity';

@Entity('book')
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', {length: 20, unique: true})
    name: string;

    @Column('nvarchar', {length: 20})
    author: string;

    @Column('nvarchar', {length: 10})
    topic: string;

    @Column('nvarchar', {length: 10})
    language: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isDeleted: boolean;

    // @                                                     H E L P !!!
    // average_rating: number;

    @Column('boolean', {default: false})
    isTaken: boolean;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.book)
    libraryEvents: Promise<LibraryEvent[]>;

    @OneToMany(type => BookReview, bookReview => bookReview.book)
    bookReview: Promise<BookReview[]>;

}
