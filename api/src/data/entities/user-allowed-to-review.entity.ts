import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('user-allowed-to-review')
export class UserAlloweToReview {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.review)
    user: Promise<User>;

    @ManyToOne(type => Book, book => book.review)
    book: Promise<Book>;

    @CreateDateColumn()
    timestamp: Date;

    @Column('boolean', {default: false})
    isAllowedToReview: boolean;

}
