import { ShowUser } from './show-user';
import { ShowReview } from './show-review';

export interface BookWithReviews {
    id: string;
    title: string;
    author: string;
    topic: string;
    laguage: string;
    timestamp: Date;
    averageRating: string;
    isTaken: boolean;
    user: ShowUser;
    // numberOfReviews: number;
    reviews: ShowReview[];
}
