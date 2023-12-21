import { Controller, Post, UseGuards, Request, Get ,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { log } from 'console';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        // console.log("log",req.user);
        return this.authService.login(req);
    }
    
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Roles([Role.User])
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

