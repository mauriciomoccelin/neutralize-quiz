import { ApiProperty } from '@nestjs/swagger';

export class QuizUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
