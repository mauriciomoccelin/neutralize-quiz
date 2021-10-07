import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { SaveQuizDto } from './modules/quiz/dto/save-quiz.dto';
import { Quiz } from './modules/quiz/models/quiz.model';
import { QuizService } from './modules/quiz/quiz.service';

import { AnswerService } from './modules/answer/answer.service';
import { SaveAnswerDto } from './modules/answer/dto/save-answer.dto';
import { Answer } from './modules/answer/models/answer.model';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly quizService: QuizService,
    private readonly answerService: AnswerService,
  ) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('quiz/save')
  @ApiBody({ type: SaveQuizDto })
  async saveQuiz(@Body() input: SaveQuizDto): Promise<boolean> {
    return this.quizService.save(input);
  }

  @Get('quiz/get-all')
  async getAllQuiz(): Promise<Array<Quiz>> {
    return await this.quizService.getAll();
  }

  @Get('quiz/get-by-id')
  async getQuizById(@Query('id') id: string): Promise<Quiz> {
    return await this.quizService.getById(id);
  }

  @Post('answer/save')
  @ApiBody({ type: SaveQuizDto })
  async saveAnswer(@Body() input: SaveAnswerDto): Promise<boolean> {
    return this.answerService.save(input);
  }

  @Get('answer/get-all')
  async getAllAnswer(): Promise<Array<Answer>> {
    return await this.answerService.getAll();
  }

  @Get('answer/get-by-id')
  async getAnswerById(@Query('id') id: string): Promise<Answer> {
    return await this.answerService.getById(id);
  }
}
