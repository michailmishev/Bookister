import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity } from 'typeorm';
import { LibraryEvent } from './library-event.entity';

@Entity('library_event_type')
export class LibraryEventType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('nvarchar', {length: 8})
    name: string;       // taken / returned

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    // @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.name)
    // libraryEvents: LibraryEvent[];

}
