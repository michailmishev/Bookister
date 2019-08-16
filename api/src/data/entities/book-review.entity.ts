import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { RatingType } from './rating-type.entity';

@Entity('book_review')
export class BookReview {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.bookReview)
    user: Promise<User>;

    @ManyToOne(type => Book, book => book.bookReview)
    book: Promise<Book>;

    @ManyToOne(type => RatingType, ratingType => ratingType.name)
    rating: RatingType;

    @Column('nvarchar', {length: 1000})
    comment: string;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isDeleted: boolean;

}
