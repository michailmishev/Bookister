import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
// import { BooksComponent } from './posts/posts.component';
// import { BookViewComponent } from './post-view/post-view.component';



const routes: Routes = [
    // { path: '', component: BooksComponent, pathMatch: 'full' },
    { path: '', component: BooksListComponent, pathMatch: 'full' },
    // { path: ':id', component: BookViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class BooksRoutingModule { }



