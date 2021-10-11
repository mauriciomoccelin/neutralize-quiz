import { Document } from 'mongoose';

import { AnswerCategory } from './answer-category.model';
import { AnswerUser } from './answer-user.model';
import { QuizUser } from 'src/modules/quiz/models/quiz-user';

export interface Answer extends Document {
  description: string;
  quizOf: QuizUser;
  answerAt: Date;
  answerBy: AnswerUser;
  categories: AnswerCategory[];
}
