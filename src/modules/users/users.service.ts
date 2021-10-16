import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { User } from './models/use.model';

@Injectable()
export class UsersService {
  private readonly saltOrRounds = 10;

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async register(user: UserDto): Promise<boolean> {
    user.password = await bcrypt.hash(user.password, this.saltOrRounds);

    await this.userModel.updateOne(
      { username: user.username },
      { $set: user },
      { upsert: true },
    );

    return true;
  }

  async findOne(username: string): Promise<User> {
    return this.userModel
      .findOne({ username: username })
      .select('roles')
      .exec();
  }

  async checkPassword(username: string, password: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({ username: username })
      .select('password')
      .exec();

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }
}
