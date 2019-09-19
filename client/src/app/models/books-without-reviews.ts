import { ShowReview } from './show-review';

export interface BookWithoutReviews {
  id: string;
  title: string;
  author: string;
  topic: string;
  laguage: string;
  timestamp: Date;
  averageRating: string;
  isTaken: boolean;

  numberOfReviews: number;
  reviews: ShowReview[];
}
