import { Document } from 'mongoose';

import { Question } from './quiz-question.model';

export interface Category extends Document {
  active: boolean;
  description: string;
  questions: Question[];
}
