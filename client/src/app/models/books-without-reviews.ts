import { ShowReview } from './show-review';

export interface BookWithoutReviews {
  id: string;
  title: string;
  author: string;
  topic: string;
  language: string;
  timestamp: Date;
  averageRating: string;
  isTaken: boolean;

  reviews: ShowReview[];
  numberOfReviews: number;    // !
}
