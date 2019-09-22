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
    if (comment.length >= 1 && ratingType.toString().length >= 1 ) {

      // const review = { ratingType, comment };

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




