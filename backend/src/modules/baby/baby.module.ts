import { Module } from '@nestjs/common';
import { BabyService } from './baby.service';
import { BabyController } from './baby.controller';

@Module({
  controllers: [BabyController],
  providers: [BabyService],
})
export class BabyModule {}
