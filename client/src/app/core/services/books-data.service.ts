import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookWithoutReviews } from '../../models/books-without-reviews';


@Injectable()
export class BooksDataServices {

  public constructor(private readonly http: HttpClient) {}

  public getAllBooks(): Observable<BookWithoutReviews[]> {
    return this.http.get<BookWithoutReviews[]>(`http://localhost:3000/books`);
  }

}
