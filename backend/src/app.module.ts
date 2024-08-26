import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGateway } from './modules/chat/chat.gateway';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [CommonModule, AuthModule, ChatModule],
  providers: [ChatGateway],
})
export class AppModule {}
