import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/role.enum';

export class UserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ isArray: true, enum: Role })
  roles: Role[];
}
