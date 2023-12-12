import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(req) {
    const user = req.user;
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user: user._doc
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, role } = signupDto;
    
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...signupDto,
      password: hashedPassword,
      roles: role,
    });
    await newUser.save();

    const { password: _, ...result } = newUser.toObject();
    return result;
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  }
}
