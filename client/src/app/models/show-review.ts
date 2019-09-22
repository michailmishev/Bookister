import { ShowUser } from './show-user';

export interface ShowReview {
  id: string;
  user: ShowUser;
  ratingType: string;
  comment: string;
  timestamp: Date;
}


// ratingType: string;   // RatingTypeEnum / number / string


