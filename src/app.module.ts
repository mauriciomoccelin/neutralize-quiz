import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [DatabaseModule, QuizModule, AnswerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
