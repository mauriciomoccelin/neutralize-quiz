import { Document } from 'mongoose';

import { QuizQuestion } from './quiz-question.model';

export interface QuizCategory extends Document {
  active: boolean;
  description: string;
  questions: QuizQuestion[];
}
