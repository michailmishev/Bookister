import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  BooksDataServices
} from '../../core/services/books-data.service';
import {
  BookWithReviews
} from '../../models/books-with-reviews';
import {
  Subscription
} from 'rxjs';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/core/services/auth.service';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit, OnDestroy {

  public book: BookWithReviews;
  public routeParamsSubscription: Subscription;
  public bookSubscription: Subscription;
  public updateBookSubscription: Subscription;
  // public lockBookSubscription: Subscription;
  public deleteBookSubscription: Subscription;
  // title, author, topic, language
  public title: string;
  public author: string;
  public topic: string;
  public language: string;
  public bookToUpdate: string;
  //
  public successMessage: any;
  public showEditButton: boolean;
  public showDeleteButton: boolean;
  public isBanned: boolean;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly booksDataServices: BooksDataServices,
    private readonly router: Router,
    private readonly authService: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.bookSubscription = this.booksDataServices.getSingleBook(params.id).subscribe((data: BookWithReviews) => {
          this.book = data;

          this.title = data.title;
          this.author = data.author;    // user?
          this.topic = data.topic;
          this.language = data.language;

          // this.bookToUpdate = data.body;

          const reversed = this.authService.reverseToken();
          const isAdmin = this.authService.setAdminStatus();

          // if (data.author.username === reversed.username) {
          //   this.showEditButton = true;
          //   this.showDeleteButton = true;
          // }
          if ( isAdmin === 1) {
            this.showDeleteButton = true;
          }
        },
          (err: any) => {
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            }
          });
      }
    );
    this.isBanned = this.authService.getBanstatus();

  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
    if (this.updateBookSubscription) {
      this.updateBookSubscription.unsubscribe();
    }
    if (this.deleteBookSubscription) {
      this.deleteBookSubscription.unsubscribe();
    }
  }


  reviewCreated() {
    this.routeParamsSubscription.unsubscribe();
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.bookSubscription.unsubscribe();
        this.bookSubscription = this.booksDataServices.getSingleBook(params.id).subscribe((data: BookWithReviews) => {
          this.book = data;
        });
      }
    );
  }
  open(content) {
    this.modalService.open(content);
  }


  public updateBook(title, author, topic, language) {
    const book = {
      title,
      author,
      topic,
      language
    };
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.bookSubscription.unsubscribe();
        this.updateBookSubscription = this.booksDataServices.updateBook(params.id, book).subscribe((data) => {
          if (data.message === 'Book has been updated successfully!') {
            this.successMessage = data.message;
          }
          setTimeout(() => {
            location.reload();
          }, 1000);
          this.router.navigate([`/books/${params.id}`]);
        }, (err: any) => {
          this.successMessage = 'Book cannot be changed!';
        });
      });
  }

  public deleteBook() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.bookSubscription.unsubscribe();
        this.deleteBookSubscription = this.booksDataServices.deleteBook(params.id).subscribe((data) => {
          // location.reload()
          this.router.navigate(['/books']);
        }, (err: any) => {
          this.successMessage = 'Book cannot be deleted!';

        });
      });
  }

}
