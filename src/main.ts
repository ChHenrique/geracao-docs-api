import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configOpenAPIZod } from './config/openApi.zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const openApiComponents = configOpenAPIZod();

  const config = new DocumentBuilder()
    .setTitle('Document Generation API')
    .setDescription('An API that generates PDF documents')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document.components = {
    ...document.components,
    ...openApiComponents,
  };

  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
