import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignInResponse } from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authDto: AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }
  @Post('/signin')
  async signIn(@Body() authDto: AuthDto): Promise<SignInResponse> {
    return this.authService.signIn(authDto);
  }
}
