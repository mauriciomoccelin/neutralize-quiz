import { internet, name, random } from 'faker';

import { Role } from '../../src/modules/roles/role.enum';
import { UserDto } from '../../src/modules/users/dto/user.dto';

export const roles: Role[] = [Role.Admin, Role.User];

export const genereteUserDto = (): UserDto => ({
  name: name.firstName() + ' ' + name.lastName(),
  email: internet.email(),
  password: internet.password(),
  username: internet.userName(),
  roles: random.arrayElements(roles),
});
