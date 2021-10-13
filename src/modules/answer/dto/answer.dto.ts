import { ApiProperty } from '@nestjs/swagger';

import { QuizUserDto } from '../../quiz/dto/quiz-user.dto';
import { AnswerCategoryDto } from './answer-category.dto';
import { AnswerUserDto } from './answer-user.dto';

export class AnswerDto {
  @ApiProperty()
  description: string;
  @ApiProperty({ type: QuizUserDto })
  quizOf: QuizUserDto;
  @ApiProperty({ type: AnswerUserDto })
  answerBy: AnswerUserDto;
  @ApiProperty()
  answerAt: Date;
  @ApiProperty({ type: () => [AnswerCategoryDto] })
  categories: AnswerCategoryDto[];
}
