import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoginInterceptor } from './interceptors/login.interceptor';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // Remove properties not in DTO
      forbidNonWhitelisted: true,  // Throw error for unknown fields
      transform: true,             // Automatically transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.useGlobalInterceptors(new LoginInterceptor());
  app.useGlobalInterceptors(new ErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Quis API')
    .setDescription('CRUD API for Quis')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
