// NestJS는 무조건 main.ts 파일을 가진다. main.ts에서 시작
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // AppModule: 모든 것의 루트 모듈 (모듈: 어플리케이션의 일부분)
  await app.listen(3000);
}
bootstrap();
