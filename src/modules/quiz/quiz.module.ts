import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { quizProviders } from './quiz.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [QuizService, ...quizProviders],
  exports: [QuizService, ...quizProviders],
})
export class QuizModule {}
