import { Document } from 'mongoose';

import { AnswerQuestion } from './answer-question.model';

export interface AnswerCategory extends Document {
  description: string;
  questions: AnswerQuestion[];
}
