import { Connection } from 'mongoose';
import { QuizSchema } from 'src/database/schemas/quiz.schema';

export const quizProviders = [
  {
    provide: 'QUIZ_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Quiz', QuizSchema, "quizzes"),
    inject: ['DATABASE_CONNECTION'],
  },
];
