import { ApiProperty } from '@nestjs/swagger';
import { Question } from './quiz-question.dto';

export class Category {
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  description: string;
  @ApiProperty({type: () => [Question]})
  questions: Question[];
}
