import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { genereteUserDto } from './fixture/test-fixture';

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

  test('/ (GET)', () => {
    console.log(access_token);
  });

  afterAll(async () => {
    await app.close();
  });
});
