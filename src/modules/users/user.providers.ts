import { Connection } from 'mongoose';
import { UserSchema } from 'src/database/schemas/user.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema, 'users'),
    inject: ['DATABASE_CONNECTION'],
  },
];
