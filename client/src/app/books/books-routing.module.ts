import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookViewComponent } from './book-view/book-view.component';


const routes: Routes = [
  { path: '', component: BooksComponent, pathMatch: 'full' },
  { path: ':id', component: BookViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class BooksRoutingModule { }
