import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 데코레이터 -> 클래스에 함수 기능을 추가할 수 있다.
@Module({
  imports: [],
  controllers: [AppController], // controller는 기본적으로 url을 가져오고 함수를 실행하는 일을 한다. -> express의 라우터 같은 존재
  providers: [AppService],
})
export class AppModule {}
