import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReviewsDataService } from 'src/app/core/services/reviews-data.service';

@Component({
  selector: 'app-create-reviews',
  templateUrl: './create-reviews.component.html',
  styleUrls: ['./create-reviews.component.css']
})
export class CreateReviewsComponent implements OnInit {

  @Input()
  bookId: string;
  @Output()
  reviewCreatedEvent = new EventEmitter();

  constructor(
    private readonly reviewsDataService: ReviewsDataService,
  ) { }

  createReview(ratingType: number, comment: string) {
    if (comment.length >= 1) {
      this.reviewsDataService.postReview(this.bookId, { ratingType, comment }).subscribe(
        (res: Response) => {
          this.reviewCreatedEvent.emit();
        }
      );
    }
  }

  ngOnInit() {
  }

}


// -------------------------------------------------------------------------

// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { CommentsDataService } from 'src/app/core/services/comments-data.service';

// @Component({
//   selector: 'app-create-comments',
//   templateUrl: './create-comments.component.html',
//   styleUrls: ['./create-comments.component.css']
// })
// export class CreateCommentsComponent implements OnInit {
  // @Input()
  // postId: string;
  // @Output()
  // commentCreatedEvent = new EventEmitter();

  // constructor(
  //   private readonly commentsDataService: CommentsDataService,
  // ) { }

  // createComment(body: string) {
  //   if (body.length >= 1) {
  //     this.commentsDataService.postComment(this.postId, { body }).subscribe(
  //       (res: Response) => {
  //         this.commentCreatedEvent.emit();
  //       }
  //     );
  //   }
  // }

  // ngOnInit() {
  // }

// }
