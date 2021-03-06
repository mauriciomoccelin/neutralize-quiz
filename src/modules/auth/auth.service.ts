import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const isValid = await this.usersService.checkPassword(username, pass);
    if (isValid) {
      const result = await this.usersService.findOne(username);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user._id,
      roles: user.roles,
      username: user.username,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
