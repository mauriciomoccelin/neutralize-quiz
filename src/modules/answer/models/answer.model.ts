import { Document } from 'mongoose';

import { Category } from './answer-category.model';

export interface Answer extends Document {
  answerAt: Date,
  description: string;
  categories: Category[];
}
