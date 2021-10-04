import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../models/answer-question-type';

export class Question {
  @ApiProperty({ enum: QuestionType })
  type: QuestionType;
  @ApiProperty()
  description: string;
  @ApiProperty()
  answer: string;
}
