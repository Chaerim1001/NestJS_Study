import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // express의 get 라우터와 같은 역할
  getHello(): string {
    return this.appService.getHello(); // 여기서 서비스가 필요한 이유는?
    // NestJS는 controller를 비지니스 로직과 구분 짓고 싶어한다 (controller는 그저 url을 가져오는 역할일 뿐..)
  }

  @Get('/hi') // 데코레이터는 반드시 꾸며주는 함수 바로 위에 있어야 잘 작동한다.
  sayHello(): string {
    return this.appService.getHi();
  }
}
