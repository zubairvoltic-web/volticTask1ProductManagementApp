import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // ✅ Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true,              // allow cookies/authorization headers
  });

  await app.listen(3000);
}
bootstrap();
