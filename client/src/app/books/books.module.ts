import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BooksListComponent } from './books-list/books-list.component';

import { BooksRoutingModule } from './books-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
// import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  providers: [],
  declarations: [BooksListComponent /* , BooksComponent, BooksViewComponent */ ],
  imports: [
    BooksRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    // NgxPaginationModule
  ],
})

export class BooksModule { }

