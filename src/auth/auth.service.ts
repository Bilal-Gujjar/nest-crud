import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {


  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    console.log(email, password);
  
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: user.email, sub: user.roles};
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, role } = signupDto;
    console.log(email, password, role);
    
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      ...signupDto,
      password: hashedPassword,
      roles: [role], 
    });

    newUser.save();

    const { password: _, ...result } = newUser;
    return result;
  }
}
