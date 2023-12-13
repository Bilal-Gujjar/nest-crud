import { Role } from "src/common/enums/role.enum";
import { IsEmail, IsNotEmpty, IsString, isEmail } from "class-validator";
import { Roles } from "../decorators/roles.decorator";
export class SignupDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNotEmpty()
    roles:[Role];

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

  }
  