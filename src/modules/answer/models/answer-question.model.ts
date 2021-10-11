import { Document } from 'mongoose';

import { AnswerQuestionType } from './answer-question-type';

export interface AnswerQuestion extends Document {
  answer: string;
  type: AnswerQuestionType;
  description: string;
}
