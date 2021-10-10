import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    select: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  roles: {
    type: [String],
    select: true,
    required: true
  },
});
