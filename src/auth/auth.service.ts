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

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user.toObject();
        return result as UserDocument;
      }
      return null;
    } catch (error) {
      console.error('Error in validateUser:', error);
      throw new Error('An error occurred during user validation');
    }
  }
  
  async login(req: any) {
    const user = req.user; // Access the user object from req.user
    const payload = { 
      email: user.email, 
      sub: user._id,
      role: user.roles 
    };
    console.log("payload", payload);
  
    return {
      token: this.jwtService.sign(payload),
      user: user // Assuming you want to return the user object
    };
  }

  async signup(signupDto: SignupDto) {
    const { email, password, roles } = signupDto;
    
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...signupDto,
      password: hashedPassword,
      roles: roles,
    });
    await newUser.save();

    const { password: _, ...result } = newUser.toObject();
    return result;
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  }
}
