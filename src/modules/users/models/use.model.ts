import { Document } from 'mongoose';
import { Role } from '../../roles/role.enum';

export interface User extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  roles: Role[];
}
