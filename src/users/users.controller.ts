import { Controller, Post, Body ,Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles([Role.Admin])
  @Get('all')
  async getAllUsers() {
      return this.usersService.getAllUsers();
  } 
}
