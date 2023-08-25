import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';

@Module({
  imports: [],
  controllers: [PolicyController],
  providers: [PolicyService]
})
export class PolicyModule {}
