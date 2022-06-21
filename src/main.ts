// NestJS는 무조건 main.ts 파일을 가진다. main.ts에서 시작
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // AppModule: 모든 것의 루트 모듈 (모듈: 어플리케이션의 일부분)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // whitelist: If set to true validator will strip validated object of any properties that do not have any decorators.
  // forbidNonWhitelisted: If set to true, instead of stripping non-whitelisted properties validator will throw an error (요청 자체를 막는다.)
  // transform: 받은 데이터를 우리가 원하는 실제 타입으로 변경해준다
  await app.listen(3000);
}
bootstrap();
