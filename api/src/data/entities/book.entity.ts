import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { boolean } from 'joi';
import { LibraryEvent } from './library-event.entity';
import { Review } from './review.entity';
import { RatingTypeEnum } from '../../common/enums/rating-type.enum';

@Entity('book')
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', {length: 50, unique: true})
    title: string;

    @Column('nvarchar', {length: 50})
    author: string;

    @Column('nvarchar', {length: 20})
    topic: string;

    @Column('nvarchar', {length: 20})
    language: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isDeleted: boolean;

    @Column({
        type: 'enum',
        enum: RatingTypeEnum,               // Awful / Bad / Average / Good / Excellent
    })
    averageRating: RatingTypeEnum;          // Awful / Bad / Average / Good / Excellent

    @Column('boolean', {default: false})
    isTaken: boolean;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.book)
    libraryEvents: Promise<LibraryEvent[]>;

    @OneToMany(type => Review, review => review.book)
    review: Promise<Review[]>;

}
