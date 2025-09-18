import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: 'KDSFGSDKHGDKFAKSDPWEFMLEMFMDSFNDJGBSDMSLKFSD',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  }));
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
