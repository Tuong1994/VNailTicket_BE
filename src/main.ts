import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from 'cors';
import path = require('path');
import cookieParser = require('cookie-parser');
import cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(path.join(__dirname, '../../'));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  await app.listen(5000);
}
bootstrap();
