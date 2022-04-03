import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: environment.ngURL, credentials: true });
  await app.listen(3000);
}
bootstrap();
