import { ApiProperty } from '@nestjs/swagger';
import { QuizCategoryDto } from './quiz-category.dto';
import { QuizUserDto } from './quiz-user.dto';

export class QuizDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => QuizUserDto })
  quizOf: QuizUserDto;
  @ApiProperty({ type: () => [QuizCategoryDto] })
  categories: QuizCategoryDto[];
}
