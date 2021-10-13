import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { QuizDto } from './../src/modules/quiz/dto/quiz.dto';

import { genereteUserDto, generetSaveQuizDto } from './fixture/test-fixture';
import { SaveAnswerDto } from 'src/modules/answer/dto/save-answer.dto';
import { lorem } from 'faker';

describe('AppController (e2e)', () => {
  let access_token: string;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userToRegister = genereteUserDto();
    const userToLogin = {
      username: userToRegister.username,
      password: userToRegister.password,
    };

    await request(app.getHttpServer())
      .post('/app/users/register')
      .send(userToRegister)
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/app/auth/login')
      .send(userToLogin)
      .set('Accept', 'application/json')
      .expect(201);

    access_token = response.body.access_token;
  });

  test('(POST) /app/quizzes/my/save', async () => {
    const response = await request(app.getHttpServer())
      .post('/app/quizzes/my/save')
      .set('Authorization', `Bearer ${access_token}`)
      .send(generetSaveQuizDto());

    expect(response.status).toBe(201);
  });

  test('(GET) /app/quizzes/my/get-all', async () => {
    const response = await request(app.getHttpServer())
      .get('/app/quizzes/my/get-all')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
  });

  test('(GET) /app/quizzes/my/get-by-id', async () => {
    const responseGetAll = await request(app.getHttpServer())
      .get('/app/quizzes/my/get-all')
      .set('Authorization', `Bearer ${access_token}`);

    expect(responseGetAll.status).toBe(200);
    const quizzes = responseGetAll.body as QuizDto[];
    const quiz = quizzes[0];

    expect(quiz).not.toBeNull();

    const qyery = { id: quiz._id };
    const response = await request(app.getHttpServer())
      .get('/app/quizzes/my/get-by-id')
      .query(qyery)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
  });

  test('(GET) /app/quizzes/get-all', async () => {
    const query = {
      skip: 1,
      limit: 10,
      keyword: null,
    };

    const response = await request(app.getHttpServer())
      .get('/app/quizzes/get-all')
      .query(query)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
  });

  test('(GET) /app/quizzes/get-by-id', async () => {
    const responseGetAll = await request(app.getHttpServer())
      .get('/app/quizzes/get-all')
      .set('Authorization', `Bearer ${access_token}`);

    expect(responseGetAll.status).toBe(200);
    const quizzes = responseGetAll.body as QuizDto[];
    const quiz = quizzes[0];

    expect(quiz).not.toBeNull();

    const qyery = { id: quiz._id };
    const response = await request(app.getHttpServer())
      .get('/app/quizzes/get-by-id')
      .query(qyery)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
  });

  test('(POST) /app/answers/save', async () => {
    const responseGetAll = await request(app.getHttpServer())
      .get('/app/quizzes/get-all')
      .set('Authorization', `Bearer ${access_token}`);

    expect(responseGetAll.status).toBe(200);
    const quizzes = responseGetAll.body as QuizDto[];
    const quiz = quizzes[0];

    expect(quiz).not.toBeNull();

    const qyery = { id: quiz._id };
    const responseGetById = await request(app.getHttpServer())
      .get('/app/quizzes/get-by-id')
      .query(qyery)
      .set('Authorization', `Bearer ${access_token}`);

    expect(responseGetById.status).toBe(200);

    const answer = responseGetById.body as SaveAnswerDto;
    expect(answer).not.toBeNull();

    for (const category of answer.categories) {
      for (const question of category.questions) {
        question.answer = lorem.sentence();
      }
    }

    const response = await request(app.getHttpServer())
      .post('/app/answers/save')
      .set('Authorization', `Bearer ${access_token}`)
      .send(answer);

    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
