import { ShowUser } from './show-user';
import { ShowReview } from './show-review';

export interface BookWithReviews {
    id: string;
    title: string;
    author: string;
    topic: string;
    language: string;
    timestamp: Date;
    averageRating: string;
    isTaken: boolean;
    takenBy: string;

    user: ShowUser;
    review: ShowReview[];
    numberOfReviews: number;    // !
}

