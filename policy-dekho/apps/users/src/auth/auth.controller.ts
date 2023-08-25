import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get ,Request} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SignUpDTo } from './dtos/sign-up.dto';
import { SignInDTO } from './dtos/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'signin' })
  signIn(payload: SignInDTO) {
    return this.authService.signIn(payload.username, payload.password);
  }

  @MessagePattern({ cmd: 'signup' })
  signUp(payload: SignUpDTo) {
    return this.authService.signUp(payload);
  }
}