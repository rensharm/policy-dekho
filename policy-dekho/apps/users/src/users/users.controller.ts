import { Controller, Get,Post, UseGuards,Request, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
constructor(private readonly userService: UsersService){
  
}
  @MessagePattern({ cmd: 'profile' })
  getProfile(payload) {
    return this.userService.getProfile(payload);
  }

  @MessagePattern({ cmd: 'purchasePolicy' })
  purchasePolicy(payload) {
    return this.userService.purchasePolicy(payload);
  }

  @MessagePattern({ cmd: 'claimPolicy' })
  claimPolicy(payload) {
    return this.userService.claimPolicy(payload);
  }
}
