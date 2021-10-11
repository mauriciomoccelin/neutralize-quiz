import { ApiProperty } from '@nestjs/swagger';
import { AnswerQuestion } from './answer-question.dto';

export class AnswerCategory {
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [AnswerQuestion] })
  questions: AnswerQuestion[];
}
