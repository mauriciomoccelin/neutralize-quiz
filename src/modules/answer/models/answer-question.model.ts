import { Document } from 'mongoose';

import { QuestionType } from './answer-question-type';

export interface Question extends Document {
  answer: String,
  type: QuestionType;
  description: string;
}
