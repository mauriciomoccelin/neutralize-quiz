import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  active: Boolean,
  type: Number,
  description: String,
});

export const CategorySchema = new mongoose.Schema({
  active: Boolean,
  description: String,
  questions: [QuestionSchema],
});

export const QuizSchema = new mongoose.Schema({
  active: Boolean,
  description: String,
  categories: [CategorySchema],
});
