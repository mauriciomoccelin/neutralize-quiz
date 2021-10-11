import * as mongoose from 'mongoose';

export const AnswerQuestionSchema = new mongoose.Schema({
  type: Number,
  answer: String,
  description: String,
});

export const QuizUserSchema = new mongoose.Schema({
  name: Boolean,
  email: String,
});

export const AnswerUserSchema = new mongoose.Schema({
  name: Boolean,
  email: String,
});

export const AnswerCategorySchema = new mongoose.Schema({
  description: String,
  questions: [AnswerQuestionSchema],
});

export const AnswerSchema = new mongoose.Schema({
  answerAt: Date,
  description: String,
  quizOfUserId: String,
  quizOf: QuizUserSchema,
  answerByUserId: String,
  answerBy: AnswerUserSchema,
  categories: [AnswerCategorySchema],
});
