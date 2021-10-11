import { Document } from 'mongoose';

export interface AnswerUser extends Document {
  name: string;
  email: string;
}
