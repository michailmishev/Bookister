import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { CreateReviewsComponent } from './reviews/create-reviews/create-reviews.component';
import { ViewReviewsComponent } from './reviews/view-reviews/view-reviews.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    CreateReviewsComponent,
    ViewReviewsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    NotFoundComponent,
    ErrorComponent,
    ViewReviewsComponent,
    CreateReviewsComponent,
  ]
})
export class SharedModule { }
