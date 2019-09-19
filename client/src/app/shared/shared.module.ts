import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    NotFoundComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
