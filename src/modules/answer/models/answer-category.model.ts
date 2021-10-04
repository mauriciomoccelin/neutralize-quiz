import { Document } from 'mongoose';

import { Question } from './answer-question.model';

export interface Category extends Document {
  description: string;
  questions: Question[];
}
