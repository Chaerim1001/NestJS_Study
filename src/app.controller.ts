import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // express의 get 라우터와 같은 역할
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello') // 데코레이터는 반드시 꾸며주는 함수 바로 위에 있어야 잘 작동한다.
  sayHello(): string {
    return 'Hello everyone';
  }
}
