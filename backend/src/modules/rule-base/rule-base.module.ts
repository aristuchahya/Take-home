import { Module } from '@nestjs/common';
import { RuleBaseService } from './rule-base.service';
import { RuleBaseController } from './rule-base.controller';

@Module({
  controllers: [RuleBaseController],
  providers: [RuleBaseService],
})
export class RuleBaseModule {}
