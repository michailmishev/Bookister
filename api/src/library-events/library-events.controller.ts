import { Controller } from '@nestjs/common';
import { LibraryEventsService } from './library-events.service';

@Controller('library-events')
export class LibraryEventsController {

    constructor(
        private readonly libraryEventsService: LibraryEventsService,
    ) { }

}

