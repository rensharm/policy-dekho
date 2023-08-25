import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PolicyService } from './policy.service';

@Controller('policy')
export class PolicyController {
    constructor(private readonly policyService: PolicyService){

    }

    @MessagePattern({ cmd: 'create' })
    create(payload): Promise<any> {
        return this.policyService.create(payload); 
    }

    @MessagePattern({ cmd: 'getPolicy' })
    async get(payload){
        if(payload.name){
            return this.policyService.get(payload.name); 
        }
        return this.policyService.get(); 
    }
}
