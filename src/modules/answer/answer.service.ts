import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { Answer } from './models/answer.model';
import { SaveAnswerDto } from './dto/save-answer.dto';
import { IdentityService } from '../shared/identity.service';
import { AnswerUser } from './models/answer-user.model';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_MODEL')
    private answerModel: Model<Answer>,
    private identityService: IdentityService,
  ) {}

  async save(saveAnswerDto: SaveAnswerDto): Promise<boolean> {
    const identityModel = this.identityService.getUser();
    const quizUser = {
      _id: identityModel.id,
      name: identityModel.name,
      email: identityModel.email,
    } as AnswerUser;

    const answerToCreated = new this.answerModel(saveAnswerDto);
    answerToCreated.answerBy = quizUser;
    saveAnswerDto.answerAt = new Date();

    await answerToCreated.save();

    return true;
  }

  async getByUserWhoResponded(
    keyword: string,
    skip: number,
    limit: number,
  ): Promise<Answer[]> {
    const userId = this.identityService.getUserId();
    const quizzes = await this.answerModel
      .find({
        projection: { description: 1 },
        options: { skip: skip, limit: limit },
        filter: { answerByUserId: userId, description: keyword },
      })
      .sort('answerAt')
      .exec();

    return quizzes;
  }

  async getByUserWhoRespondedById(id: string): Promise<Answer> {
    const userId = this.identityService.getUserId();
    return this.answerModel.findOne({ _id: id, answerByUserId: userId }).exec();
  }

  async getByUserWhoAsked(
    keyword: string,
    skip: number,
    limit: number,
  ): Promise<Answer[]> {
    const userId = this.identityService.getUserId();
    const quizzes = await this.answerModel
      .find({
        projection: { description: 1 },
        options: { skip: skip, limit: limit },
        filter: { quizOfUserId: userId, description: keyword },
      })
      .sort('answerAt')
      .exec();

    return quizzes;
  }

  async getByUserWhoAskedById(id: string): Promise<Answer> {
    const userId = this.identityService.getUserId();
    return this.answerModel.findOne({ _id: id, quizOfUserId: userId }).exec();
  }
}
