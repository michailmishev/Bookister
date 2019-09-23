import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditReviewModel } from 'src/app/models/edit-reviews';
import { CreateReviewModel } from 'src/app/models/create-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsDataService {

  constructor(private readonly http: HttpClient) { }

  public postReview(bookId: string, reviewBody: CreateReviewModel): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/books/${bookId}/reviews`, reviewBody);
  }

  public deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/0/reviews/${reviewId}`);
  }

  public editReview(reviewId: string, reviewBody: EditReviewModel): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/books/0/reviews/${reviewId}`, reviewBody);
  }

}
