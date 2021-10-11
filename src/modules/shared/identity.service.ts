import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../roles/role.enum';
import { User } from '../users/models/use.model';

export interface IdentityModel {
  id: string
  name: string,
  email: string,
  username: string;
  roles: Role[];
}

@Injectable({ scope: Scope.REQUEST })
export class IdentityService {
  constructor(@Inject(REQUEST) private request: Request) {}

  public getUser(): IdentityModel {
    const userRequest = this.request.user as User;
    const identityModel = {
      id: userRequest._id,
      name: userRequest.name,
      email: userRequest.email,
      username: userRequest.username,
      roles: userRequest.roles,
    }

    return identityModel as IdentityModel;
  }

  public getUserId(): string {
    const user = this.getUser();
    return user?.id;
  }

  public getUserUniqueName(): string {
    const user = this.getUser();
    return user?.username;
  }

  public checkIfUserIsAdmin() {
    const user = this.getUser();
    return user?.roles.includes(Role.Admin);
  }
}
