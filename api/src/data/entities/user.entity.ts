import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Banstatus } from './banstatus.entity';
import { Role } from './role.entity';
import { LibraryEvent } from './library-event.entity';
import { type } from 'os';
import { Review } from './review.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({length: 15, unique: true})
    username: string;

    @Column('nvarchar')
    password: string;

    @Column({length: 15, unique: true})
    email: string;

    @JoinTable()
    @ManyToMany(type => Role, { eager: true })
    roles: Role[];

    @Column('boolean', {default: false})
    isDeleted: boolean;

    @JoinColumn()
    @OneToOne(type => Banstatus, {eager: true})
    banstatus: Banstatus;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.user)
    libraryEvents: Promise<LibraryEvent>;

    @OneToMany(type => Review, review => review.user)
    review: Promise<Review[]>;

}
