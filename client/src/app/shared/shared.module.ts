import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { CreateReviewsComponent } from './reviews/create-reviews/create-reviews.component';
import { ViewReviewsComponent } from './reviews/view-reviews/view-reviews.component';
import { AdminButtonsComponent } from './admin-buttons/admin-buttons.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    CreateReviewsComponent,
    ViewReviewsComponent,
    AdminButtonsComponent
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
    AdminButtonsComponent
  ]
})
export class SharedModule { }
