import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService  ) {}

  @Post('/signup')
  signUp(@Body() params: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(params);
  }

  @Post('/signin')
  signIn(@Body() params: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(params);
  }
}
