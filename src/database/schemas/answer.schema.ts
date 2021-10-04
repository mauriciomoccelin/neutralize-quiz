import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  type: Number,
  answer: String,
  description: String,
});

export const CategorySchema = new mongoose.Schema({
  description: String,
  questions: [QuestionSchema],
});

export const AnswerSchema = new mongoose.Schema({
  answerAt: Date,
  description: String,
  categories: [CategorySchema],
});
