import { ApiProperty } from '@nestjs/swagger';
import { QuizQuestionType } from '../models/quiz-question-type';

export class QuizQuestionDto {
  @ApiProperty()
  active: boolean;
  @ApiProperty({ enum: QuizQuestionType })
  type: QuizQuestionType;
  @ApiProperty()
  description: string;
}
