import { ApiProperty } from '@nestjs/swagger';
import { AnswerQuestionType } from '../models/answer-question-type';

export class AnswerQuestionDto {
  @ApiProperty({ enum: AnswerQuestionType })
  type: AnswerQuestionType;
  @ApiProperty()
  description: string;
  @ApiProperty()
  answer: string;
}
