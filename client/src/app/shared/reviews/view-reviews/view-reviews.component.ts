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

  // public reviewToUpdate: string;  // ?
  public ratingType: number;
  public comment: string;

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



  public showEdit(authorId: string) {
    const reversed = this.authService.reverseToken();
    if (authorId === reversed.id) {
      return true;
    }
    return false;
  }

  public showDelete(authorId: string) {
    const reversed = this.authService.reverseToken();
    const isAdmin = this.authService.setAdminStatus();
    if (authorId === reversed.id || isAdmin === 1) {
      return true;
    }
    return false;
  }

  // public showButtons(authorId: string) {
  //   const reversed = this.authService.reverseToken();
  //   const isAdmin = this.authService.setAdminStatus();
  //   if (authorId === reversed.id || isAdmin === 1) {
  //     return true;
  //   }
  //   return false;
  // }



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


  selectUser(userId: string) {
    this.router.navigate(['/users/', userId]);
  }


  deleteReview(reviewId: string) {
    this.deleteReviewSubscription = this.reviewsDataServices.deleteReview(reviewId).subscribe((data) => {
      this.deletedReviewEvent.emit();
    });
    this.reviewUpdated();
  }


  // ----------- In order to update average rating of the book: ----------
  reviewUpdated() {
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
  // ----------- ---------- ---------- ----------


  open(content) {
    this.modalService.open(content);
  }



  editReview(reviewId: string, ratingType: number, comment: string) {
    if (comment.length >= 1 && ratingType.toString().length >= 1 ) {
      ratingType = +ratingType;
      const updateReviewBody = {
        ratingType,
        comment
      };

      this.editReviewSubscription = this.reviewsDataServices.editReview(reviewId, updateReviewBody).subscribe((data) => {

        if (data.message === 'Review has been updated successfully!') {
          this.successMessage = data.message;
        }

        this.editedReviewEvent.emit();
        this.modalService.dismissAll();

        location.reload();    // couldn't reload average rating after editing a review
      });

      // this.reviewUpdated();
      // this.router.navigate([`/books/${this.book.id}`]);
      // location.reload();

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
