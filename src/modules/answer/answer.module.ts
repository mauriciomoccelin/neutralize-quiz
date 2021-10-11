import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { answerProviders } from './answer.providers';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [AnswerService, ...answerProviders],
  exports: [AnswerService, ...answerProviders],
})
export class AnswerModule {}
