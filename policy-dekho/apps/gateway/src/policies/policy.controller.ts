import { Body, Controller, Get, Inject, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CommonErrorhandlerInterceptor } from '../interceptor/common-errorhandler-interceptor.interceptor';
import { CreatePolicyDTO } from './dtos/create-policy.dto';

@UseInterceptors(new CommonErrorhandlerInterceptor())
@Controller('policy')
export class PolicyController {
    constructor(@Inject('POLICY_SERVICE') public client: ClientProxy,){

    }

    @Post('/create')
    async create(@Body() payload: CreatePolicyDTO){
        const pattern = { cmd: 'create' };
        return this.client.send(pattern, payload);
    }

    @Get('/get')
    async get(){
        const pattern = { cmd: 'getPolicy' };
        return this.client.send(pattern, {});
    }

    @Get('/get/:name')
    async getPolicy(@Param() params: any){
        const pattern = { cmd: 'getPolicy' };
        return this.client.send(pattern, params);
    }
}
