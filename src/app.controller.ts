import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { SaveQuizDto } from './modules/quiz/dto/save-quiz.dto';
import { Quiz } from './modules/quiz/models/quiz.model';
import { QuizService } from './modules/quiz/quiz.service';

import { AnswerService } from './modules/answer/answer.service';
import { SaveAnswerDto } from './modules/answer/dto/save-answer.dto';
import { Answer } from './modules/answer/models/answer.model';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { UserDto } from './modules/users/dto/user.dto';
import { UsersService } from './modules/users/users.service';
import { Roles } from './modules/roles/roles.decorator';
import { Role } from './modules/roles/role.enum';
import { RolesGuard } from './modules/roles/roles.guard';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private readonly quizService: QuizService,
    private readonly answerService: AnswerService,
  ) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('users/register')
  @ApiBody({ type: UserDto })
  async registerUser(@Body() input: UserDto): Promise<boolean> {
    return this.userService.register(input);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('quizzes/my/save')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SaveQuizDto })
  async saveQuiz(@Body() input: SaveQuizDto): Promise<boolean> {
    return this.quizService.save(input);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('quizzes/my/get-all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllQuiz(): Promise<Array<Quiz>> {
    return await this.quizService.getUserQuizzes();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('quizzes/my/get-by-id')
  @UseGuards(JwtAuthGuard)
  async getUserQuizById(@Query('id') id: string): Promise<Quiz> {
    return await this.quizService.getUserQuizById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @Get('quizzes/get-all')
  @UseGuards(JwtAuthGuard)
  async getAllQuizzes(
    @Query() keyword: string,
    @Query() skip: number,
    @Query() limit: number,
  ): Promise<Quiz[]> {
    return await this.quizService.getAll(keyword, skip, limit);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @Get('quizzes/get-by-id')
  @UseGuards(JwtAuthGuard)
  async getQuizById(@Query() id: string): Promise<Quiz> {
    return await this.quizService.getById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @Post('answer/save')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SaveAnswerDto })
  async saveAnswer(@Body() input: SaveAnswerDto): Promise<boolean> {
    return this.answerService.save(input);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Get('answer/get-all')
  @UseGuards(JwtAuthGuard)
  async getAllAnswer(): Promise<Array<Answer>> {
    return await this.answerService.getAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Get('answer/get-by-id')
  @UseGuards(JwtAuthGuard)
  async getAnswerById(@Query('id') id: string): Promise<Answer> {
    return await this.answerService.getById(id);
  }
}
