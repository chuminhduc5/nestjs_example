import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(session({
    name: 'NESTJS_SESSION_ID',
    secret: 'KDSFGSDKHGDKFAKSDPWEFMLEMFMDSFNDJGBSDMSLKFSD',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
    store: new TypeormStore().connect(sessionRepository),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
