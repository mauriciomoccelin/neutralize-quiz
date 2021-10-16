import * as mongoose from 'mongoose';

export const QuizQuestionSchema = new mongoose.Schema({
  active: Boolean,
  type: Number,
  description: String,
});

export const QuizUserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export const QuizCategorySchema = new mongoose.Schema({
  active: Boolean,
  description: String,
  questions: [QuizQuestionSchema],
});

export const QuizSchema = new mongoose.Schema({
  userId: String,
  active: Boolean,
  description: String,
  quizOf: QuizUserSchema,
  categories: [QuizCategorySchema],
});
