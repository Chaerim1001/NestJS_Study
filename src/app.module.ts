import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

// 데코레이터 -> 클래스에 함수 기능을 추가할 수 있다.
@Module({
  imports: [],
  controllers: [MoviesController], // controller는 기본적으로 url을 가져오고 함수를 실행하는 일을 한다. -> express의 라우터 같은 존재
  providers: [MoviesService],
})
export class AppModule {}
