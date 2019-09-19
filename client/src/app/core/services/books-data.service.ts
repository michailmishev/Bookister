import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookWithoutReviews } from '../../models/books-without-reviews';
import { BookWithReviews } from 'src/app/models/books-with-reviews';
import { CreateBookModel } from 'src/app/models/create-book';
import { UpdateBookModel } from 'src/app/models/update-book';



@Injectable()
export class BooksDataServices {

  public constructor(private readonly http: HttpClient) {}

  public getAllBooks(): Observable<BookWithoutReviews[]> {
    return this.http.get<BookWithoutReviews[]>(`http://localhost:3000/books`);
  }

  public getSingleBook(bookId: string): Observable<BookWithReviews> {
    return this.http.get<BookWithReviews>(`http://localhost:3000/books/${bookId}`);
  }

  public createBook(bookBody: CreateBookModel): Observable<any> {
    return this.http.post('http://localhost:3000/books', bookBody);
  }

  public deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/${bookId}`);
  }

  public updateBook(bookId: string, updatedBook: UpdateBookModel): Observable<any> {
    return this.http.put(`http://localhost:3000/books/${bookId}`, updatedBook);
  }


}
