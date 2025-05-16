import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/types/app-config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  if (!appConfig) {
    throw new Error('App config not found!');
  }
  const server_host: string = appConfig.host;
  const server_port: number = appConfig.port;

  await app.listen(server_port, server_host);
  console.log(`Server running on http://${server_host}:${server_port}`);
}
bootstrap()
  .then(() => {
    console.log('Bootstrap completed successfully');
  })
  .catch((err) => {
    console.error('Bootstrap failed:', err);
  });
