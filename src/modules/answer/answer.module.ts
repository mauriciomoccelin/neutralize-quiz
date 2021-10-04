import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { answerProviders } from './answer.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AnswerService, ...answerProviders],
  exports: [AnswerService, ...answerProviders],
})
export class AnswerModule {}
