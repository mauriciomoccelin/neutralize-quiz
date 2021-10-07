import { ApiProperty } from '@nestjs/swagger';
import { Category } from './quiz-category.dto';

export class QuizDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [Category] })
  categories: Category[];
}
