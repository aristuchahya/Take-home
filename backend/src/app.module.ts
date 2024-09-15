import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';
import { UsersModule } from './modules/users/users.module';
import { RuleBaseModule } from './modules/rule-base/rule-base.module';
import { FuzzyDetectionModule } from './modules/fuzzy-detection/fuzzy-detection.module';
import { BabyModule } from './modules/baby/baby.module';

@Module({
  imports: [CommonModule, AuthModule, ChatModule, UsersModule, RuleBaseModule, FuzzyDetectionModule, BabyModule],
  providers: [ChatGateway],
})
export class AppModule {}
