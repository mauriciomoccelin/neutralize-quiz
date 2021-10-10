import { ApiProperty } from '@nestjs/swagger';
import { Category } from './answer-category.dto';

export class AnswerDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  answerAt: Date;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [Category] })
  categories: Category[];
}
