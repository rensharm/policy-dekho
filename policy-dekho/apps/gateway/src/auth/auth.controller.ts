import { Body, Controller, Post, HttpCode, HttpStatus, Inject, UnauthorizedException, Logger, UseInterceptors} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { SignUpDTo } from './dtos/sign-up.dto';
import { SignInDTO } from './dtos/signIn.dto';
import { CommonErrorhandlerInterceptor } from '../interceptor/common-errorhandler-interceptor.interceptor';
import { map } from 'rxjs';

@UseInterceptors(new CommonErrorhandlerInterceptor())
@Controller('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') public client: ClientProxy,
  public jwtService: JwtService
    ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signIn(@Body() payload: SignInDTO) {
    const pattern = { cmd: 'signin' };
      return this.client.send(pattern, payload).pipe(
        map(data => {
          if(data.sub){
            return {
              access_token: this.jwtService.sign(data)
            }
          } else{
             Logger.error(payload.username, 'Failed to login');
             throw new UnauthorizedException();
          }
        }),
       )
    }

  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  signUp(@Body() payload: SignUpDTo) {
    const pattern = { cmd: 'signup' };
    return this.client.send(pattern, payload)
  }
}