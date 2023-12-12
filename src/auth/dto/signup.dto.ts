import { Role } from "src/common/enums/role.enum";

export class SignupDto {
    email: string;
    password: string;
    roles: [Role];
  }
  