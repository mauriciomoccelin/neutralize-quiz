import { ApiProperty } from '@nestjs/swagger';
import { Question } from './answer-question.dto';

export class Category {
  @ApiProperty()
  description: string;
  @ApiProperty({type: () => [Question]})
  questions: Question[];
}
