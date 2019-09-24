import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReviewsDataService } from './reviews-data.service';
import { of } from 'rxjs';

describe('CommentsDataService', () => {
    const http = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete']);

    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: HttpClient,
                useValue: http,
            },
        ]
    }));

    it('should be created', () => {
        const service: ReviewsDataService = TestBed.get(ReviewsDataService);
        expect(service).toBeTruthy();
    });


    // deleteReview
    describe('deleteReview', () => {
        it('should delete a review by a given id', () => {
            const service = TestBed.get(ReviewsDataService);
            const reviewId = '1';

            http.delete.and.returnValue(
              of({ message: 'Review successfully deleted' })
            );
            service.deleteReview(reviewId).subscribe((res) => {
              expect(res.message).toBe('Review successfully deleted');
            });
            http.delete.calls.reset();
          });
      });


    // postReview
    describe('postReview', () => {
        it('should create a review', () => {
            const postId = '1';
            const reviewBody = {
                ratingType: 1,
                comment: 'test'
            };
            http.post.and.returnValue(of(reviewBody));
            const service: ReviewsDataService = TestBed.get(ReviewsDataService);
            service.postReview(postId, reviewBody).subscribe(
                (res) => {
                    expect(res).toEqual(reviewBody);
                }
            );
            http.post.calls.reset();
        });
    });


    // editReview
    describe('updateReview', () => {
        it('should update a choosen review', () => {
          const reviewId = '1';
          const reviewBody = {
            ratingType: 1,
            comment: 'test'
        };

          http.put.and.returnValue(of(reviewBody));
          const service: ReviewsDataService = TestBed.get(ReviewsDataService);

          service.editReview(reviewId, reviewBody).subscribe((res) => {
            expect(res).toEqual(reviewBody);
          });
          http.put.calls.reset();
        });
      });


});
