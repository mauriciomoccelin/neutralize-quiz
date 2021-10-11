import { Document } from 'mongoose';

export interface QuizUser extends Document {
  name: string;
  email: string;
}
