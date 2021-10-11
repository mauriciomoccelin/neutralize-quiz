import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.providers';
import { DatabaseModule } from 'src/database/database.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [DatabaseModule, SharedModule],
  providers: [QuizService, ...quizProviders],
  exports: [QuizService, ...quizProviders],
})
export class QuizModule {}
