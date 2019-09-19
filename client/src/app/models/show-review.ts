import { ShowUser } from './show-user';

export interface ShowReview {
  id: string;
  author: ShowUser;
  ratingType: string;   // RatingTypeEnum
  comment: string;
  timestamp: Date;
}
