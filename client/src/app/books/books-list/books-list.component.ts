import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksDataServices } from 'src/app/core/services/books-data.service';
import { BookWithoutReviews } from '../../models/books-without-reviews';
import { ReviewsDataService } from 'src/app/core/services/reviews-data.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {

  @Output()
  public selectedBook = new EventEmitter<string>();
  public books: BookWithoutReviews[] = [];
  private booksSubscription: Subscription;


  constructor(
    private readonly booksDataService: BooksDataServices,
  ) { }

  ngOnInit() {
    this.booksSubscription = this.booksDataService.getAllBooks().subscribe(
      (books: BookWithoutReviews[]) => {
        this.books = books;

        this.books.forEach((book: BookWithoutReviews, index: number) => {

          // if (book.reviews !== undefined) {
            book.numberOfReviews = book.reviews.length;
          // }

          // book.numberOfReviews = book.reviews.length;

        });
        this.books.sort((a, b) => {
          const c = new Date(a.timestamp).valueOf();
          const d = new Date(b.timestamp).valueOf();
          return d - c;
        });
      }
    );
  }

  selectBook(book: BookWithoutReviews) {
    this.selectedBook.emit(book.id);
  }

  ngOnDestroy() {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }

}
