import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BookWithReviews } from '../../../models/books-with-reviews';
import { Router } from '@angular/router';
import { BooksDataServices } from '../../../core/services/books-data.service';
import { ReviewsDataService } from '../../../core/services/reviews-data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit, OnDestroy {

  @Input()
  book: BookWithReviews;
  @Output()
  deletedReviewEvent = new EventEmitter();
  @Output()
  editedReviewEvent = new EventEmitter();

  public routeParamsSubscription: Subscription;
  public reviewSubscription: Subscription;
  public deleteReviewSubscription: Subscription;
  public editReviewSubscription: Subscription;
  public bookSubscription: Subscription;
  public showDeleteReviewButton: boolean;
  public showEditReviewButton: boolean;
  public reviewToUpdate: string;
  public successMessage: any;
  public isBanned: boolean;



  constructor(

    private readonly activatedRoute: ActivatedRoute,
    private readonly booksDataServices: BooksDataServices,
    private readonly reviewsDataServices: ReviewsDataService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private modalService: NgbModal,

  ) { }


  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.bookSubscription = this.booksDataServices.getSingleBook(params.id).subscribe((data: BookWithReviews) => {
          // this.book = data;
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


  public showButtons(authorId: string) {
    const reversed = this.authService.reverseToken();
    const isAdmin = this.authService.setAdminStatus();
    if (authorId === reversed.id || isAdmin === 1) {
      return true;
    }
    return false;
  }


  selectUser(userId: string) {
    this.router.navigate(['/users/', userId]);
  }


  deleteReview(reviewId: string) {
    this.deleteReviewSubscription = this.reviewsDataServices.deleteReview(reviewId).subscribe((data) => {
      this.deletedReviewEvent.emit();
    });
  }

  open(content) {
    this.modalService.open(content);
  }


  editReview(reviewId: string, reviewBody) {
    if (reviewBody.length >= 1) {
      this.editReviewSubscription = this.reviewsDataServices.editReview(reviewId, reviewBody).subscribe((data) => {
        this.book = data;                             // ???????
        this.reviewToUpdate = data.reviewBody;
        if (data.message === 'Review has been updated successfully!') {
          this.successMessage = data.message;
        }
        this.editedReviewEvent.emit();
        this.modalService.dismissAll();
      });
    }
  }


  ngOnDestroy() {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
    if (this.reviewSubscription) {
      this.reviewSubscription.unsubscribe();
    }
    if (this.deleteReviewSubscription) {
      this.deleteReviewSubscription.unsubscribe();
    }
    if (this.editReviewSubscription) {
      this.editReviewSubscription.unsubscribe();
    }
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }



}
