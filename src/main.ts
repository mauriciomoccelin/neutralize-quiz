import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  const options = {
    origin: '*',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.enableCors(options);

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Quiz API')
    .setDescription('The quiz API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
