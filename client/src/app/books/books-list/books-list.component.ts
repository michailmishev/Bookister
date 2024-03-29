import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksDataServices } from 'src/app/core/services/books-data.service';
import { BookWithoutReviews } from '../../models/books-without-reviews';
import { ReviewsDataService } from 'src/app/core/services/reviews-data.service';
import { AuthService } from 'src/app/core/services/auth.service';

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

  public logedInUser: string;       // -------------------------
  
  constructor(
    private readonly booksDataService: BooksDataServices,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.booksSubscription = this.booksDataService.getAllBooks().subscribe(
      (books: BookWithoutReviews[]) => {
        this.books = books;

        this.books.forEach((book: BookWithoutReviews, index: number) => {
          // if (book.reviews !== undefined) {
            book.numberOfReviews = book.reviews.length;
          // }
        });
        this.books.sort((a, b) => {
          const c = new Date(a.timestamp).valueOf();
          const d = new Date(b.timestamp).valueOf();
          return d - c;
        });
      }
    );

    this.logedInUser = this.authService.reverseToken().username;
        // (book.takenBy === reversed.username)


  }

  public isThereAverageRating(averageRating: any) {
    if (averageRating >= 1 && averageRating <= 5) {
      return true;
    }
    return false;
  }

  // --------- lame :( --------
  public isOneStar(averageRating: any) {
    const roundedNum = Math.round(averageRating);
    if (roundedNum === 1) {
      return true;
    }
    return false;
  }
  public isTwoStar(averageRating: any) {
    const roundedNum = Math.round(averageRating);
    if (roundedNum === 2) {
      return true;
    }
    return false;
  }
  public isThreeStar(averageRating: any) {
    const roundedNum = Math.round(averageRating);
    if (roundedNum === 3) {
      return true;
    }
    return false;
  }
  public isFourStar(averageRating: any) {
    const roundedNum = Math.round(averageRating);
    if (roundedNum === 4) {
      return true;
    }
    return false;
  }
  public isFiveStar(averageRating: any) {
    const roundedNum = Math.round(averageRating);
    if (roundedNum === 5) {
      return true;
    }
    return false;
  }
  // -----------------------------


  selectBook(book: BookWithoutReviews) {
    this.selectedBook.emit(book.id);
  }

  ngOnDestroy() {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }

}
