import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, Entity } from 'typeorm';
import { LibraryEvent } from './library-event.entity';
import { LibraryEventTypeEnum } from '../../common/enums/library-event-type.enum';
@Entity('library_event_type')
export class LibraryEventType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: LibraryEventTypeEnum,         // Taken / Returned
    })
    name: LibraryEventTypeEnum;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - -

    // @OneToMany(type => LibraryEvent, libraryEvent => libraryEvent.name)
    // libraryEvents: LibraryEvent[];

}
