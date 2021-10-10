import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Injectable, Inject } from '@nestjs/common';

import { Quiz } from './models/quiz.model';
import { SaveQuizDto } from './dto/save-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @Inject('QUIZ_MODEL')
    private quizModel: Model<Quiz>,
  ) {}

  async save(saveQuizDto: SaveQuizDto): Promise<boolean> {
    const quizExists = await this.quizModel.exists({ _id: saveQuizDto._id });
    if (quizExists) {
      await this.quizModel.updateOne(
        { _id: saveQuizDto._id },
        { $set: saveQuizDto },
        { upsert: true },
      );
    } else {
      const quizToCreated = new this.quizModel(saveQuizDto);
      await quizToCreated.save();
    }

    return true;
  }

  async getAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async getById(id: string): Promise<Quiz> {
    return this.quizModel.findOne({ _id: id }).exec();
  }
}
