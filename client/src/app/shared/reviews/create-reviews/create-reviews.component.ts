import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReviewsDataService } from 'src/app/core/services/reviews-data.service';
//  -------- ------- ------- ------- ------- ------- ------- ------- --------
// import { BookWithReviews } from 'src/app/models/books-with-reviews';
// import { AuthService } from 'src/app/core/services/auth.service';
// import { forEach } from '@angular/router/src/utils/collection';
//  -------- ------- ------- ------- ------- ------ ------- ------- ---------

@Component({
  selector: 'app-create-reviews',
  templateUrl: './create-reviews.component.html',
  styleUrls: ['./create-reviews.component.css']
})
export class CreateReviewsComponent implements OnInit {

  public successMessage: any;
  public radioButtonValue: any;

  @Input()
  bookId: string;
  // book: BookWithReviews;    // ------- ------- -------

  @Output()
  reviewCreatedEvent = new EventEmitter();

  constructor(
    private readonly reviewsDataService: ReviewsDataService,
    // private readonly authService: AuthService,      // -------- -------- --------
  ) { }

  
  //  -------- ------- ------- 
  // public userAlreadyLeftReview() {
  // }
  //  -------- ------- ------- 



  setRadioButtonValue(buttonValue: any) {
    this.radioButtonValue = buttonValue;
  }



  createReview(ratingType: number, comment: string) {
    if (comment.length >= 1 && ratingType.toString().length >= 1 ) {
      ratingType = +ratingType;
      const createReviewBody = {
        ratingType,
        comment
      };

      // this.reviewsDataService.postReview(this.bookId, createReviewBody).subscribe(
      //   (res: Response) => {
      //     this.reviewCreatedEvent.emit();
      //   }
      // );
      //
      this.reviewsDataService.postReview(this.bookId, createReviewBody).subscribe((data) => {
        if (data.message === 'Review has been submitted successfully!') {
          this.successMessage = data.message;
        }

        // setTimeout(() => {
        //   this.reviewCreatedEvent.emit();
        // }, 1000);

        this.reviewCreatedEvent.emit();

        }, (err: any) => {
          this.successMessage = 'Review cannot be left at the moment!';
        }
      );

    }
  }


  ngOnInit() {
  }

}
