import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1/api");

  const config = new DocumentBuilder()
    .setTitle('interview test  example')
    .setDescription('The interview test API description')
    .setVersion('1.0')
    .addServer("http://localhost:3000")
    .addTag('users api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
