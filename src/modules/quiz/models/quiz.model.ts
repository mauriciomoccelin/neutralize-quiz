import { Document } from 'mongoose';

import { Category } from './quiz-category.model';

export interface Quiz extends Document {
  active: boolean;
  description: string;
  categories: Category[];
}
