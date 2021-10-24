import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { Quiz } from './models/quiz.model';
import { SaveQuizDto } from './dto/save-quiz.dto';
import { IdentityService } from '../shared/identity.service';
import { QuizUser } from './models/quiz-user';

@Injectable()
export class QuizService {
  constructor(
    @Inject('QUIZ_MODEL')
    private quizModel: Model<Quiz>,
    private identityService: IdentityService,
  ) {}

  async save(saveQuizDto: SaveQuizDto): Promise<boolean> {
    const identityModel = this.identityService.getUser();
    const quizUser = {
      _id: identityModel.id,
      name: identityModel.name,
      email: identityModel.email,
    } as QuizUser;

    const quizExists = await this.quizModel.exists({ _id: saveQuizDto._id });
    if (quizExists) {
      const existingQuiz = await this.quizModel.findOne({
        _id: saveQuizDto._id,
      });

      existingQuiz.quizOf = quizUser;
      existingQuiz.userId = identityModel.id;

      await this.quizModel.updateOne(
        { _id: existingQuiz._id },
        { $set: existingQuiz },
        { upsert: true },
      );
    } else {
      const quizToCreated = new this.quizModel(saveQuizDto);

      quizToCreated.quizOf = quizUser;
      quizToCreated.userId = identityModel.id;

      await quizToCreated.save();
    }

    return true;
  }

  async getUserQuizzes(): Promise<Quiz[]> {
    const userId = this.identityService.getUserId();
    const quizzes = await this.quizModel
      .find({ userId: userId, active: true }, { description: 1 })
      .sort('description')
      .exec();

    return quizzes;
  }

  async getUserQuizById(id: string): Promise<Quiz> {
    const userId = this.identityService.getUserId();
    const quiz = await this.quizModel
      .findOne({ _id: id, userId: userId })
      .exec();

    return quiz;
  }

  async getAll(keyword: string, skip: number, limit: number): Promise<Quiz[]> {
    const quizzes = await this.quizModel
      .find({
        options: { skip: skip, limit: limit },
        filter: { active: true, description: keyword },
      })
      .select(['description', 'quizOf'])
      .sort('description')
      .exec();

    return quizzes;
  }

  async getById(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findOne({ _id: id }).exec();

    return quiz;
  }
}
