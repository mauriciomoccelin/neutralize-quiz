import { ApiProperty } from '@nestjs/swagger';

export class AnswerUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
}
