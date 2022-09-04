import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CLASS VALIDATION / CLASS TRANSFORM
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // si llegan atributos que no estan definidos en el dtos, los ignora y continua
      forbidNonWhitelisted: true, // alerta de atributos que no esta definido en el esquema de los dtos
      transformOptions: { enableImplicitConversion: true }, // convierte string a number en @Query params
    }),
  );

  // INTERCEPTOR:
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // DOCUMENTACION
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY V1')
    .setDescription('DOCUMENTS OF API BY VICTOR QUINO')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('MICROSERVICES API-GATEWAY')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  // PREFIX:
  app.setGlobalPrefix('api/v1');

  // habilitar acceso a todos CORS:
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
