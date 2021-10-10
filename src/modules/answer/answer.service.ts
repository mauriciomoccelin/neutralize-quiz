import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { Answer } from './models/answer.model';
import { SaveAnswerDto } from './dto/save-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_MODEL')
    private answerModel: Model<Answer>,
  ) {}

  async save(saveAnswerDto: SaveAnswerDto): Promise<boolean> {
    saveAnswerDto.answerAt = new Date();

    await this.answerModel.updateOne(
      { _id: saveAnswerDto._id },
      { $set: saveAnswerDto },
      { upsert: true },
    );

    return true;
  }

  async getAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  async getById(id: string): Promise<Answer> {
    return this.answerModel.findOne({ _id: id }).exec();
  }
}
