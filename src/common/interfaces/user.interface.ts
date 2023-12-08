import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

export interface User extends Document {
  email: string;
  password: string;
  roles: Role[];
  // Include other properties as needed
}
