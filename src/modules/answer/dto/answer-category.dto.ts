import { ApiProperty } from '@nestjs/swagger';
import { AnswerQuestionDto } from './answer-question.dto';

export class AnswerCategoryDto {
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [AnswerQuestionDto] })
  questions: AnswerQuestionDto[];
}
