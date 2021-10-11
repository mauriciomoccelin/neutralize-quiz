import { ApiProperty } from '@nestjs/swagger';
import { QuizQuestionDto } from './quiz-question.dto';

export class QuizCategoryDto {
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [QuizQuestionDto] })
  questions: QuizQuestionDto[];
}
