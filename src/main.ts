import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';

// ---------- ---------- ---------- ---------- ----------

import { AppModule } from './app.module';
import { CORS } from './constants';
import { ProvincesService } from './provinces/services/provinces.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
  console.log(`Application running on port => ${await app.getUrl()}`);
}
bootstrap();
