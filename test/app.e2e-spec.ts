import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { QuizDto } from './../src/modules/quiz/dto/quiz.dto';

import { genereteUserDto, generetSaveQuizDto } from './fixture/test-fixture';

const userToRegister = genereteUserDto();
const userToLogin = {
  username: userToRegister.username,
  password: userToRegister.password,
};

describe('AppController (e2e)', () => {
  let access_token: string;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

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

    const response = await request(app.getHttpServer())
      .get('/app/quizzes/my/get-by-id')
      .query({ id: quiz._id })
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
