import { Document } from 'mongoose';

import { QuestionType } from './quiz-question-type';

export interface Question extends Document {
  active: boolean;
  type: QuestionType;
  description: string;
}
