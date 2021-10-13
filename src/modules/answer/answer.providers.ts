import { Connection } from 'mongoose';
import { AnswerSchema } from '../../database/schemas/answer.schema';

export const answerProviders = [
  {
    provide: 'ANSWER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Answer', AnswerSchema, 'answers'),
    inject: ['DATABASE_CONNECTION'],
  },
];
