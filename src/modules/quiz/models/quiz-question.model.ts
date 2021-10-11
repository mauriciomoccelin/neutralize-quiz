import { Document } from 'mongoose';

import { QuizQuestionType } from './quiz-question-type';

export interface QuizQuestion extends Document {
  active: boolean;
  type: QuizQuestionType;
  description: string;
}
