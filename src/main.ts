import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ credentials: true, origin: 'http://localhost:3001' });
  app.useStaticAssets(resolve(__dirname, '../storage'), { prefix: '/storage' });
  await app.listen(3000);
}
bootstrap();
