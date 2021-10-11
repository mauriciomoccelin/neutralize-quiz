import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../roles/role.enum';
import { User } from '../users/models/use.model';

@Injectable({ scope: Scope.REQUEST })
export class IdentityService {
  constructor(@Inject(REQUEST) private request: Request) {}

  get user(): User {
    return this.request.user as User;
  }

  get id(): boolean {
    const user = this.user;
    return user?._id;
  }

  get username(): string {
    const user = this.user;
    return user?.username;
  }

  get isAdmin() {
    const user = this.user;
    return user?.roles.includes(Role.Admin);
  }
}
