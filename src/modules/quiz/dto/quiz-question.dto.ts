import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../models/quiz-question-type';

export class Question {
  @ApiProperty()
  active: boolean;
  @ApiProperty({ enum: QuestionType })
  type: QuestionType;
  @ApiProperty()
  description: string;
}
