import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
/* NestJS의 Dependency Injection -> 타입만 추가했을 뿐인데 잘 작동하는 이유
 providers를 주면 NestJS가 MoviesService를 import하고 Controller에 주입(inject)해준다 */
