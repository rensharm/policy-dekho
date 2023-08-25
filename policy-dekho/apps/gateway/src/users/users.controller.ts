import { Controller, Get,Post, UseGuards,Request, Body, Inject, PreconditionFailedException, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { AuthGuard } from '../auth/auth.guard';
import { CommonErrorhandlerInterceptor } from '../interceptor/common-errorhandler-interceptor.interceptor';
import { ClaimPolicyDTO } from './dtos/claim-policy.dto';

@UseInterceptors(new CommonErrorhandlerInterceptor())
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
constructor(@Inject('USER_SERVICE') public client: ClientProxy){
  
}
  @Get('profile')
  getProfile( @Request() req) {
    const pattern = { cmd: 'profile' };
    return this.client.send(pattern, req.user.username);
  }

  @Post('purchasePolicy')
  purchasePolicy( @Request() req, @Body() body) {
    const pattern = { cmd: 'purchasePolicy' };
    const payload = {
      username: req.user.username,
      policyName: body.policyName
    }
    return this.client.send(pattern, payload);
  }

  @Post('claimPolicy')
  claimPolicy( @Request() req, @Body() body: ClaimPolicyDTO) {
    const pattern = { cmd: 'claimPolicy' };
     const payload = {
      ...body,
      username: req.user.username
    }
    return this.client.send(pattern, payload).pipe(
      map(data => {
        if(data.success){
          return data.success;
        } else {
          throw new PreconditionFailedException(data.error);
        }
      })
    );
  }
}
