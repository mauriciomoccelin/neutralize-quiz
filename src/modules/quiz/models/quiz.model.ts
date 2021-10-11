import { Document } from 'mongoose';

import { QuizCategory } from './quiz-category.model';
import { QuizUser } from './quiz-user';

export interface Quiz extends Document {
  active: boolean;
  description: string;
  quizOf: QuizUser;
  categories: QuizCategory[];
}
